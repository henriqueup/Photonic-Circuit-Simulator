from app.models.Port import Port
from app.models.Component import Component
from app.database.Component import Component as ComponentCollection
from app.database.stored.Component import StoredComponent
from app.database.stored.Lumerical import Lumerical

class SwP(Component):
  def __init__(self, inputs, outputs, id=None):
    self.kind = "swp"
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

    swp = cls(inputs, outputs)
    swp_db = ComponentCollection(**swp.as_dict()).save()

    swp.id = swp_db.id
    return swp

  @classmethod
  def load(cls, id):
    swp_db = StoredComponent.objects(id=id).get()

    inputs = []
    for port in swp_db.inputs:
      inputs.append(Port.load(port.id))

    outputs = []
    for port in swp_db.outputs:
      outputs.append(Port.load(port.id))

    swp = cls(inputs, outputs, id)
    return swp


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
    }

  def to_json(self):
    return {
      'id': str(self.id),
      'kind': self.kind,
      'inputs': [x.to_json() for x in self.inputs],
      'outputs': [x.to_json() for x in self.outputs]
    }


  def calculate_outputs(self):
    col = self.kind + "_output"
    self.outputs[0].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

    col = self.kind + "_drain"
    self.outputs[1].power = Lumerical.calculate(col, self.inputs[0].power, self.inputs[1].power)

    return [self.outputs[0].power, self.outputs[1].power]