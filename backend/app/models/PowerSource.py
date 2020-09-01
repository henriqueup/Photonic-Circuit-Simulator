from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection

class PowerSource(Component):
  def __init__(self, outputs, id=None):
    self.kind = "power_source"
    self.inputs = []
    self.outputs = outputs
    self.id = id

  @classmethod
  def create(cls):
    outputs = []
    outputs.append(Port.create().id)

    power_source = cls(outputs)
    power_source_db = ComponentCollection(**power_source.as_dict()).save()

    power_source.id = power_source_db.id
    return power_source

  @classmethod
  def load(cls, id):
    power_source_db = ComponentCollection.objects(id=id).get()

    outputs = []
    for port in power_source_db.outputs:
      outputs.append(Port.load(port.id))

    power_source = cls(outputs, id)
    return power_source


  def get_output(self, id):
    return next((x for x in self.outputs if str(x.id) == id), None)

  def set_output(self, output):
    own_output = self.get_output(output['id'])
    if (own_output != None):
      own_output.target = output['target']
      own_output.update_data()


  def as_dict(self):
    return {
      'kind': self.kind,
      'inputs': self.inputs,
      'outputs': self.outputs
    }

  def to_json(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'outputs': [x.to_json() for x in self.outputs]
    }


  def calculateOutputs(self):
    return [self.outputs[0].power]