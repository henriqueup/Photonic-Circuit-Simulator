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

    if (port_db.target != None):
      target = port_db.target.id
    else:
      target = None
    power = port_db.power

    port = cls(target, power, id)
    return port


  def as_dict(self):
    return {'target': str(self.target.id) if self.target else None, 'power': self.power}
  
  def to_json(self):
    return {
      'id': str(self.id),
      'target': str(self.target.id) if self.target else None,
      'power': float(self.power)
    }

  def update_data(self):
    PortCollection.objects.get(id=self.id).update(**self.as_dict())

  def delete(self):
    if (self.target):
      target_port = self.target
      target_port.target = None
      target_port.update_data()
      
    PortCollection.objects(id=self.id).get().delete()

  def calculate_outputs(self):
    return [self.power]