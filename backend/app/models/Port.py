from app.database.Port import Port as PortCollection

class Port():
  def __init__(self, target, power, id=None):
    self.target = target
    self.power = power
    self.id = id

  @classmethod
  def create(cls):
    target = None
    power = 0

    port = cls(target, power)
    port_db = PortCollection(**port.as_dict()).save()

    port.id = port_db.id
    return port

  @classmethod
  def load(cls, id):
    port_db = PortCollection.objects(id=id).get()

    target = port_db.target
    power = port_db.power

    port = cls(target, power, id)
    return port


  def as_dict(self):
    return {'target': self.target, 'power': self.power}
  
  def to_json(self):
    return {
      'id': str(self.id),
      'target': self.target,
      'power': float(self.power)
    }

  def calculate_outputs(self):
    return [self.power]