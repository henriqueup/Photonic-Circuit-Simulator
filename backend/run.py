from flask import Flask
from app import app
from app.database.db import initialize_db
from app.resources.controller import controller
from app.database.Lumerical import Lumerical as LumericalCollection
import os

if __name__ == '__main__':
  #Load this config object for development mode
  app.config.from_object(os.environ['APP_SETTINGS'])
  app.config['MONGODB_SETTINGS'] = {
    'host': os.environ['MONGODB_URL']
  }

  initialize_db(app)
  LumericalCollection.initialize()
  controller.load_components()
  # initialize_routes(app)

  app.run(host='0.0.0.0')