from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection
from app.database.stored.Component import StoredComponent

class OutputReader(Component):
  def __init__(self, inputs, x, y, id=None):
    self.kind = "output_reader"
    self.inputs = inputs
    self.outputs = []
    self.x = x
    self.y = y
    self.id = id

  @classmethod
  def create(cls):
    inputs = []
    inputs.append(Port.create())

    x = 100
    y = 100

    output_reader = cls(inputs, x, y)
    output_reader_db = ComponentCollection(**output_reader.as_dict()).save()

    output_reader.id = output_reader_db.id
    return output_reader

  @classmethod
  def load(cls, id):
    output_reader_db = StoredComponent.objects(id=id).get()

    inputs = []
    for port in output_reader_db.inputs:
      inputs.append(Port.load(port.id))

    x = output_reader_db.x
    y = output_reader_db.y

    output_reader = cls(inputs, x, y, id)
    return output_reader


  def get_input(self, id):
    return next((x for x in self.inputs if str(x.id) == id), None)

  def set_input(self, id, target_port):
    input = self.get_input(id)
    if (input != None):
      input.target = target_port
      input.power = target_port.power


  def delete(self):
    for port in self.inputs:
      port.delete()
    
    for port in self.outputs:
      port.delete()

    ComponentCollection.objects(id=self.id).get().delete()

  def save(self):
    StoredComponent(**self.as_dict()).save()

    for port in self.inputs:
      port.save()

    for port in self.outputs:
      port.save()
      

  def as_dict(self):
    return {
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
      'outputs': [],
      'x': self.x,
      'y': self.y,
    }