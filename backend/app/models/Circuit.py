from app.database.Component import Component as ComponentCollection
from app.database.Circuit import Circuit as CircuitCollection
from app.database.stored.Circuit import StoredCircuit
from app.models.Component import Component
from app.models.SwN import SwN
from app.models.SwP import SwP
from app.models.PowerSource import PowerSource

class Circuit():
  def __init__(self, label, components, ports, id=None):
    self.label = label
    self.components = components
    self.ports = ports
    self.id = id

  @classmethod
  def create(cls, label="Default Label"):
    components = []
    ports = []
    label = label

    circuit = cls(label, components, ports)
    circuit_db = CircuitCollection(**circuit.as_dict()).save()

    circuit.id = circuit_db.id
    return circuit

  @classmethod
  def load(cls, id):
    circuit_db = CircuitCollection.objects(id=id).get()

    label = circuit_db.label
    components = []
    ports = []

    for component in circuit_db.components:
      component = Component.load(component.id)

      if (component.kind == 'swn'):
        components.append(SwN.load(component.id))
      elif (component.kind == 'swp'):
        components.append(SwP.load(component.id))
      elif (component.kind == 'power_source'):
        components.append(PowerSource.load(component.id))
      else:
        raise TypeError

      for port in components[-1].inputs:
        ports.append(port)
      for port in components[-1].outputs:
        ports.append(port)


    circuit = cls(label, components, ports, id)

    for port in circuit.ports:
      if (port.target is not None):
        target_port = circuit.get_port(port.target)
        if (target_port is not None):
          target_port.target = port
          port.target = target_port

    return circuit

  def update_data(self):
    CircuitCollection.objects.get(id=self.id).update(**self.as_dict())

  def as_dict(self):
    return {
      'label': self.label,
      'components': [component.id for component in self.components]
    }

  def to_json(self):
    return {
      'id': str(self.id),
      'label': self.label,
      'components': [component.to_json() for component in self.components]
    }

  def get_component(self, id):
    return next((x for x in self.components if str(x.id) == str(id)), None)

  def get_port(self, id):
    return next((x for x in self.ports if str(x.id) == str(id)), None)

  def get_component_with_input_port(self, input_port_id):
    for component in self.components:
      if (input_port_id in [str(input.id) for input in component.inputs]):
        return component
    else:
      return None

  def add_component(self, kind):
    component = None

    if (kind == 'swn'):
      component = SwN.create()
    elif (kind == 'power_source'):
      component = PowerSource.create()
    elif (kind == 'swp'):
      component = SwP.create()
    else:
      raise TypeError("Kind \'" + kind + "\' doesn't exist.")

    self.components.append(component)
    for port in component.inputs:
      self.ports.append(port)
    for port in component.outputs:
      self.ports.append(port)

    self.update_data()
    return component

  def calculate_outputs(self, id):
    component = self.get_component(id)
    if (component == None):
      return None

    return {
      'outputs': [float(x) for x in component.calculate_outputs()]
    }

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
    self.update_data()
    
    return None

  def reset(self):
    for component in self.components:
      component.delete()
      del self.components[self.components.index(component)]

    for port in self.ports:
      del self.ports[self.ports.index(port)]

    self.update_data()

  def delete(self):
    self.reset()

    CircuitCollection.objects(id=self.id).get().delete()

  def save(self):
    StoredCircuit(**self.as_dict()).save()