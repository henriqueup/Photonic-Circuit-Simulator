from app.models.SwN import SwN
from app.models.PowerSource import PowerSource
from app.models.Port import Port
from app.database.Component import Component as ComponentCollection
from app.database.Port import Port as PortCollection

class Controller:
  def __init__(self):
    self._components = []
    self._ports = []

#region Getters and Setters
  @property
  def components(self):
    return self._components

  @components.setter
  def components(self, components):
    raise AttributeError("Operation \'set\' not allowed.")

  @property
  def ports(self):
    return self._ports

  @ports.setter
  def ports(self, ports):
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
      for port in component.inputs:
        self.ports.append(port)
      for port in component.outputs:
        self.ports.append(port)

    for port in self.ports:
      if (port.target is not None):
        target_port = self.get_port(port.target)
        if (target_port is not None):
          target_port.target = port
          port.target = target_port


  def add_component(self, kind):
    if (kind == 'swn'):
      swn = SwN.create()
      self.components.append(swn)
      for port in swn.inputs:
        self.ports.append(port)
      for port in swn.outputs:
        self.ports.append(port)
    elif (kind == 'power_source'):
      power_source = PowerSource.create()
      self.components.append(power_source)
      for port in power_source.outputs:
        self.ports.append(port)
    else:
      raise TypeError("Kind \'" + kind + "\' doesn't exist.")
    

  def get_component(self, id):
    return next((x for x in self.components if str(x.id) == str(id)), None)

  def get_port(self, id):
    return next((x for x in self.ports if str(x.id) == str(id)), None)

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
      return "Component with id: " + str(id) + " doesn\'t exist.", None

    for output in outputs:
      if (component.get_output(output['id']) == None):
        return "The specified component doesn\'t have output with id: " + output['id'], None

      target_component = self.get_component_with_input_port(output['target'])
      if (target_component == None):
        return "The specified input port with id: \'" + output['target'] + "\' doesn\'t exist.", None

      component.set_output(output['id'], self.get_port(output['target']))
      target_component.set_input(output['target'], self.get_port(output['id']))

    return "Success", component

  def set_power(self, id, power):
    component = self.get_component(id)
    if (component == None):
      return "Component with id: " + str(id) + " doesn\'t exist.", None

    if (component.kind != "power_source"):
      return "Component with id: " + str(id) + " isn\'t of kind \'power_source\'.", None

    component.set_powers([power])
    return "Success", component
    

  def delete_component(self, id):
    component = self.get_component(id)
    if (component == None):
      return "Component with id: " + str(id) + " doesn\'t exist."
    
    component.delete()

    for port in component.inputs:
      port = self.get_port(port.id)
      if (port != None):
        del self.ports[self.ports.index(port)]
    for port in component.outputs:
      port = self.get_port(port.id)
      if (port != None):
         del self.ports[self.ports.index(port)]

    del self.components[self.components.index(component)]
    
    return None