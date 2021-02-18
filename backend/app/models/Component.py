from app.database.Component import Component as ComponentCollection
from app.database.Lumerical import Lumerical
from app.database.db import get_objectid
from app.models.Port import Port

class Component:
  def __init__(self, kind, inputs, outputs, x, y, label, id=None):
    self.kind = kind
    self.inputs = inputs  #Ports
    self.outputs = outputs #Ports
    self.x = x
    self.y = y
    self.label = label
    self.id = id

  @classmethod
  def create_inputs(cls, kind):
    inputs = []

    if (kind == 'swn'):
      inputs.append(Port.create())
      inputs.append(Port.create())
    elif (kind == 'swp'):
      inputs.append(Port.create())
      inputs.append(Port.create())
    elif (kind == 'power_source'):
      return inputs
    elif (kind == 'output_reader'):
      inputs.append(Port.create())
    elif (kind == 'y_junction'):
      inputs.append(Port.create())
      inputs.append(Port.create())
    elif (kind == 'y_split'):
      inputs.append(Port.create())
    else:
      raise TypeError

    return inputs

    
  @classmethod
  def create_outputs(cls, kind):
    outputs = []

    if (kind == 'swn'):
      outputs.append(Port.create())
      outputs.append(Port.create())
    elif (kind == 'swp'):
      outputs.append(Port.create())
      outputs.append(Port.create())
    elif (kind == 'power_source'):
      outputs.append(Port.create())
    elif (kind == 'output_reader'):
      return outputs
    elif (kind == 'y_junction'):
      outputs.append(Port.create())
    elif (kind == 'y_split'):
      outputs.append(Port.create())
      outputs.append(Port.create())
    else:
      raise TypeError

    return outputs

  @classmethod
  def create(cls, kind):
    inputs = Component.create_inputs(kind)
    outputs = Component.create_outputs(kind)

    x = 100
    y = 100

    label = ""

    component = cls(kind, inputs, outputs, x, y, label)

    component.id = get_objectid()
    return component

  @classmethod
  def load(cls, id, kind):
    component_db = ComponentCollection.objects(id=id).get()

    inputs = []
    for port in component_db.inputs:
      inputs.append(Port.load(port.id))

    outputs = []
    for port in component_db.outputs:
      outputs.append(Port.load(port.id))

    x = component_db.x
    y = component_db.y

    label = component_db.label

    component = cls(kind, inputs, outputs, x, y, label, id)
    return component

  def to_json(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [x.to_json() for x in self.inputs],
      'outputs': [x.to_json() for x in self.outputs],
      'x': self.x,
      'y': self.y,
      'label': self.label,
    }

  def as_dict(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [port.id for port in self.inputs],
      'outputs': [port.id for port in self.outputs],
      'x': self.x,
      'y': self.y,
      'label': self.label,
    }

  def get_input(self, id):
    return next((x for x in self.inputs if str(x.id) == id), None)

  def set_input(self, id, target_port):
    input = self.get_input(id)
    if (input != None):
      input.target = target_port
      input.power = target_port.power
  
  def set_position(self, x, y):
    self.x = x
    self.y = y
    
  def set_label(self, label):
    self.label = label

  def get_output(self, id):
    return next((x for x in self.outputs if str(x.id) == id), None)

  def set_output(self, id, target_port):
    own_output = self.get_output(id)
    if (own_output != None):
      own_output.target = target_port

  def set_powers(self, powers):
    if (self.kind != "power_source"):
      raise TypeError

    self.outputs[0].power = powers[0]
  
  def delete(self):
    for port in self.inputs:
      port.delete()
    
    for port in self.outputs:
      port.delete()

  def save(self):
    ComponentCollection(**self.as_dict()).save()

    for port in self.inputs:
      port.save()

    for port in self.outputs:
      port.save()

  def calculate_outputs(self):
    if (self.kind == 'swn' or self.kind == "swp"):
      col = self.kind + "_output"
      self.outputs[0].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

      col = self.kind + "_drain"
      self.outputs[1].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

      return [self.outputs[0].power, self.outputs[1].power]

    elif (self.kind == 'power_source'):
      return [self.outputs[0].power]

    elif (self.kind == 'output_reader'):
      raise TypeError

    elif (self.kind == 'y_junction'):
      col = self.kind + "_output"
      self.outputs[0].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

      return [self.outputs[0].power]

    elif (self.kind == 'y_split'):
      col = self.kind + "_output_1"
      self.outputs[0].power = Lumerical.calculate(col, 0, self.inputs[0].power)

      col = self.kind + "_output_2"
      self.outputs[1].power = Lumerical.calculate(col, 0, self.inputs[0].power)

      return [self.outputs[0].power, self.outputs[1].power]

    else:
      raise TypeError