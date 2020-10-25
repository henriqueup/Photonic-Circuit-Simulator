from app.database.Port import Port as PortCollection
from app.database.db import get_objectid

class Port():
  def __init__(self, target, power, id=None):
    self.target = target
    self.power = power
    self.id = id

  #region Getters and Setters
  @property
  def power(self):
    return self._power
  @power.setter
  def power(self, power):
    self._power = power

    if (self.target is not None and hasattr(self.target, 'power') and self.target.power != power):
      self.target.power = power

  @property
  def target(self):
    return self._target
  @target.setter
  def target(self, target):
    self._target = target
  #endregion

  @classmethod
  def create(cls):
    target = None
    power = 0

    port = cls(target, power)

    port.id = get_objectid()
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
    return {
      'id': str(self.id),
      'target': str(self.target.id) if self.target else None,
      'power': self.power
    }
  
  def to_json(self):
    return {
      'id': str(self.id),
      'target': str(self.target.id) if self.target else None,
      'power': float(self.power)
    }

  def delete(self):
    if (self.target):
      target_port = self.target
      target_port.target = None

  def save(self):
    PortCollection(**self.as_dict()).save()


  def calculate_outputs(self):
    return [self.power]