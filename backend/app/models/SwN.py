from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection

class SwN(Component):
  def __init__(self, inputs, outputs, id=None):
    self.kind = "swn"
    self.inputs = inputs
    self.outputs = outputs
    self.id = id

  @classmethod
  def create(cls):
    inputs = []
    inputs.append(Port.create())
    inputs.append(Port.create())
    
    outputs = []
    outputs.append(Port.create())
    outputs.append(Port.create())

    swn = cls(inputs, outputs)
    swn_db = ComponentCollection(**swn.as_dict()).save()

    swn.id = swn_db.id
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

    swn = cls(inputs, outputs, id)
    return swn


  def get_input(self, id):
    return next((x for x in self.inputs if str(x.id) == id), None)

  def set_input(self, id, target_port):
    input = self.get_input(id)
    if (input != None):
      input.target = target_port
      input.update_data()


  def get_output(self, id):
    return next((x for x in self.outputs if str(x.id) == id), None)

  def set_output(self, id, target_port):
    own_output = self.get_output(id)
    if (own_output != None):
      own_output.target = target_port
      own_output.update_data()

  def delete(self):
    for port in self.inputs:
      port.delete()
    
    for port in self.outputs:
      port.delete()

    ComponentCollection.objects(id=self.id).get().delete()


  def as_dict(self):
    return {
      'kind': self.kind,
      'inputs': [port.id for port in self.inputs],
      'outputs': [port.id for port in self.outputs],
    }

  def to_json(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [x.to_json() for x in self.inputs],
      'outputs': [x.to_json() for x in self.outputs]
    }


  def calculate_outputs(self):
    self.outputs[0].power = self.inputs[0].power
    self.outputs[1].power = self.inputs[1].power

    return [self.outputs[0].power, self.outputs[1].power]