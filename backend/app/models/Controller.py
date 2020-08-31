from app.models.SwN import SwN
from app.models.Port import Port
from app.database.Component import Component as ComponentCollection
from app.database.Port import Port as PortCollection

class Controller:
  def __init__(self):
    self._components = []

#region Getters and Setters
  @property
  def components(self):
    return self._components

  @components.setter
  def components(self, components):
    raise AttributeError("Operation \'set\' not allowed.")
#endregion

  def load_components(self):
    components = []

    for component in ComponentCollection.objects:
      if component.kind == "swn":
        components.append(SwN.load(component.id))

    for port in PortCollection.objects:
      components.append(Port.load(port.id))

    for component in components:
      self.components.append(component)


  def add_component(self, kind):
    if (kind == 'swn'):
      swn = SwN.create()
      self.components.append(swn)
      for port in swn.inputs:
        self.components.append(Port.load(port))
      for port in swn.outputs:
        self.components.append(Port.load(port))
    else:
      raise TypeError("Kind \'" + kind + "\' doesn't exist.")
    

  def calculateOutputs(self, id):
    component = next((x for x in self.components if str(x.id) == id), None)
    if (component == None):
      return None

    return {
      'outputs': [float(x) for x in component.calculateOutputs()]
    }