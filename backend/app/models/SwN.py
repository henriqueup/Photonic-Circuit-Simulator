from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection
from app.database.Lumerical import Lumerical
from app.database.db import get_objectid

class SwN(Component):
  def __init__(self, inputs, outputs, x, y, id=None):
    self.kind = "swn"
    self.inputs = inputs
    self.outputs = outputs
    self.x = x
    self.y = y
    self.id = id

  @classmethod
  def create(cls):
    inputs = []
    inputs.append(Port.create())
    inputs.append(Port.create())
    
    outputs = []
    outputs.append(Port.create())
    outputs.append(Port.create())

    x = 100
    y = 100

    swn = cls(inputs, outputs, x, y)

    swn.id = get_objectid()
    return swn

  @classmethod
  def load(cls, id):
    swn_db = ComponentCollection.objects(id=id).get()

    inputs = []
    for port in swn_db.inputs:
      inputs.append(Port.load(port.id))

    outputs = []
    for port in swn_db.outputs:
      outputs.append(Port.load(port.id))

    x = swn_db.x
    y = swn_db.y

    swn = cls(inputs, outputs, x, y, id)
    return swn


  def get_input(self, id):
    return next((x for x in self.inputs if str(x.id) == id), None)

  def set_input(self, id, target_port):
    input = self.get_input(id)
    if (input != None):
      input.target = target_port
      input.power = target_port.power


  def get_output(self, id):
    return next((x for x in self.outputs if str(x.id) == id), None)

  def set_output(self, id, target_port):
    own_output = self.get_output(id)
    if (own_output != None):
      own_output.target = target_port

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
      

  def as_dict(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [port.id for port in self.inputs],
      'outputs': [port.id for port in self.outputs],
      'x': self.x,
      'y': self.y,
    }

  def to_json(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [x.to_json() for x in self.inputs],
      'outputs': [x.to_json() for x in self.outputs],
      'x': self.x,
      'y': self.y,
    }


  def calculate_outputs(self):
    col = self.kind + "_output"
    self.outputs[0].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

    col = self.kind + "_drain"
    self.outputs[1].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

    return [self.outputs[0].power, self.outputs[1].power]