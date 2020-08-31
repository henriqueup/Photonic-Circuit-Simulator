import uuid
from app.models.Port import Port

class PowerSource:
  def __init__(self, data=None):
    self.outputs = []
    self.label = "PowerSource #"

    if (data == None):
      self.id = str(uuid.uuid4())
      self.outputs.append(Port(self.id))
    else:
      #validate data
      self.id = data['id']
      self.outputs.append(Port(self.id, data['outputs'][0]))

  def calculateOutputs(self):
    for port in self.outputs:
      if (port.power == None):
        port.calculatePower()

    return [self.outputs[0].power]