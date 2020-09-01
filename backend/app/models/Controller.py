from app.models.SwN import SwN
from app.models.PowerSource import PowerSource
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
      elif component.kind == "power_source":
        components.append(PowerSource.load(component.id))

    for component in components:
      self.components.append(component)


  def add_component(self, kind):
    if (kind == 'swn'):
      swn = SwN.create()
      self.components.append(swn)
    elif (kind == 'power_source'):
      power_source = PowerSource.create()
      self.components.append(power_source)
    else:
      raise TypeError("Kind \'" + kind + "\' doesn't exist.")
    

  def get_component(self, id):
    return next((x for x in self.components if str(x.id) == id), None)

  def calculate_outputs(self, id):
    component = self.get_component(id)
    if (component == None):
      return None

    return {
      'outputs': [float(x) for x in component.calculate_outputs()]
    }

  def get_component_with_input_port(self, input_port_id):
    for component in self.components:
      if (input_port_id in [str(input.id) for input in component.inputs]):
        return component
    else:
      return None

  def set_outputs(self, id, outputs):
    component = self.get_component(id)
    if (component == None):
      return "Component with id: " + str(id) + " doesn't exist.", None

    for output in outputs:
      if (component.get_output(output['id']) == None):
        return "The specified component doesn't have output with id: " + output['id'], None

      target_component = self.get_component_with_input_port(output['target'])
      if (target_component == None):
        return "The specified input port with id: \'" + output['target'] + "\' doesn't exist.", None

      component.set_output(output)
      target_component.set_input(output)

    return "Success", component

    