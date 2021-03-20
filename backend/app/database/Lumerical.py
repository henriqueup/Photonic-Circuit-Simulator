from app.database.db import db
import mongoengine_goodjson as gj
import pandas as pd
import numpy as np
from decimal import Decimal
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sympy.solvers import solve
from sympy import Symbol
from mongoengine.queryset.visitor import Q
import scipy as sp

class Lumerical(gj.Document):
  switch_cols = {
    "swn_output": 2,
    "swn_drain": 3,
    "swp_output": 4,
    "swp_drain": 5
  }
  y_connector_cols = {
    "y_split_output_1": 2,
    "y_split_output_2": 3,
    "y_junction_output": 4
  }

  #list of polynomial variables, indexed by degree-1
  variables = []

  splines = []

  kind = db.StringField()
  degree = db.IntField()
  betas = db.ListField(db.DecimalField(precision=10))

  df = None
  df_switch = pd.read_csv('app/resources/LumericalValues/switchValues.csv')
  df_y_connector = pd.read_csv('app/resources/LumericalValues/yConnectorValues.csv')

  def get_col_index(col):
    if col in Lumerical.switch_cols:
      return Lumerical.switch_cols[col]
    elif col in Lumerical.y_connector_cols:
      return Lumerical.y_connector_cols[col]

  def set_df(col):
    if col in Lumerical.switch_cols:
      Lumerical.df = Lumerical.df_switch
    elif col in Lumerical.y_connector_cols:
      Lumerical.df = Lumerical.df_y_connector

  def generate_spline(col):
    if Lumerical.df is None:
      return None

    z_col = Lumerical.get_col_index(col)

    x = Lumerical.df.iloc[:,0:1].copy().to_numpy()
    y = Lumerical.df.iloc[:,1:2].copy().to_numpy()
    z = Lumerical.df.iloc[:,z_col].copy().to_numpy()

    return {
      'col': col,
      'approx': sp.interpolate.Rbf(x,y,z,function='thin_plate',smooth=5, episilon=5)
    }

  def get_spline(col):
    spline = next((x for x in Lumerical.splines if x["col"] == col), None)

    if (spline is None):
      spline = Lumerical.generate_spline(col)

      if (spline is None):
        return None

      Lumerical.splines.append(spline)

    return spline

  def calculate(col, control, input):
    Lumerical.set_df(col)

    if Lumerical.df is None:
      return None

    spline = Lumerical.get_spline(col)
    result = spline["approx"](input, control)

    return result if result > 0 else 0
    


  def initialize_old():
    for degree in range(1, 5):
      Lumerical.variables.append(Lumerical.generateVariables(degree))

    if (Lumerical.objects.count() == 0):
      Lumerical.df = Lumerical.df_switch
      for key in Lumerical.switch_cols:
        for degree in range(1, 5):
          betas = Lumerical.polynomialRegression(Lumerical.switch_cols[key], degree)

          doc = {
            'kind': key,
            'degree': degree,
            'betas': betas
          }
          Lumerical(**doc).save()

      Lumerical.df = Lumerical.df_y_connector
      for key in Lumerical.y_connector_cols:
        for degree in range(1, 5):
          betas = Lumerical.polynomialRegression(Lumerical.y_connector_cols[key], degree)

          doc = {
            'kind': key,
            'degree': degree,
            'betas': betas
          }
          Lumerical(**doc).save()

  #𝑓(𝑥₁, 𝑥₂) = 𝑏₀ + 𝑏₁𝑥₁ + 𝑏₂𝑥₂ + 𝑏₃𝑥₁² + 𝑏₄𝑥₁𝑥₂ + 𝑏₅𝑥₂²
  def polynomialRegression(y_col, degree):
    x = Lumerical.df.iloc[:,0:2].copy().to_numpy()
    y = Lumerical.df.iloc[:,y_col].copy().to_numpy()

    x_ = PolynomialFeatures(degree=degree, include_bias=False).fit_transform(x)
    model_p = LinearRegression().fit(x_, y)
    r_sq_p = model_p.score(x_, y)

    betas = [model_p.intercept_]
    betas.extend(model_p.coef_)
    return betas

  def generateVariables(degree):
    if (degree <= 0):
      return []
    if (degree == 1):
      return ['1*', 'x*', 'y*']
      
    curr = Lumerical.generateVariables(degree-1)

    pol_vals = []
    for x in range(degree, -1, -1):
      for y in range(degree-x, degree-x+1):
        pol_vals.append('x*'*x + 'y*'*y)

    for val in pol_vals:
      curr.append(val)
    
    return curr

  def calculate_old(col, control, input):
    x = float(input)
    y = float(control)
    Lumerical.set_df(col)

    if Lumerical.df is None:
      return None

    degree = 4 if input >= 0 and input <= 60 and control >= 0 and control <= 60 else 2
    betas = Lumerical.objects(Q(kind=col) & Q(degree=degree)).get().betas
    variables = Lumerical.variables[degree-1]

    function = [x + str(y) for x,y in zip(variables,betas)]
    function = '+'.join(function)

    result = eval(function)
    return result if result >= 0 else 0