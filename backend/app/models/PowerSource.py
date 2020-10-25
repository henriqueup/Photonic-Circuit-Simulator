from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection
from app.database.db import get_objectid

class PowerSource(Component):
  def __init__(self, outputs, x, y, id=None):
    self.kind = "power_source"
    self.inputs = []
    self.outputs = outputs
    self.x = x
    self.y = y
    self.id = id

  @classmethod
  def create(cls):
    outputs = []
    outputs.append(Port.create())

    x = 100
    y = 100

    power_source = cls(outputs, x, y)

    power_source.id = get_objectid()
    return power_source

  @classmethod
  def load(cls, id):
    power_source_db = ComponentCollection.objects(id=id).get()

    outputs = []
    for port in power_source_db.outputs:
      outputs.append(Port.load(port.id))

    x = power_source_db.x
    y = power_source_db.y

    power_source = cls(outputs, x, y, id)
    return power_source


  def get_output(self, id):
    return next((x for x in self.outputs if str(x.id) == id), None)

  def set_output(self, id, target_port):
    own_output = self.get_output(id)
    if (own_output != None):
      own_output.target = target_port

  def set_powers(self, powers):
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
      'inputs': [],
      'outputs': [x.to_json() for x in self.outputs],
      'x': self.x,
      'y': self.y,
    }


  def calculate_outputs(self):
    return [self.outputs[0].power]