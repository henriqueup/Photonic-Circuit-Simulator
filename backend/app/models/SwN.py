from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection
import json

class SwN(Component):
  def __init__(self, inputs, outputs, id=None):
    self.kind = "swn"
    self.inputs = inputs
    self.outputs = outputs
    self.id = id

  @classmethod
  def create(cls):
    inputs = []
    inputs.append(Port.create().id)
    inputs.append(Port.create().id)
    
    outputs = []
    outputs.append(Port.create().id)
    outputs.append(Port.create().id)

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


  def as_dict(self):
    return {
      'kind': self.kind,
      'inputs': self.inputs,
      'outputs': self.outputs,
    }

  def get_data(self):
    return ComponentCollection.objects(id=self.id).get()

  def calculateOutputs(self):
    self.outputs[0].power = self.inputs[0].power
    self.outputs[1].power = self.inputs[1].power

    return [self.outputs[0].power, self.outputs[1].power]