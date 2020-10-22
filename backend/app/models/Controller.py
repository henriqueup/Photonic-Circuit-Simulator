from mongoengine import NotUniqueError
from app.models.Circuit import Circuit
from app.database.Circuit import Circuit as CircuitCollection

class Controller:
  def __init__(self):
    self.circuit_ids = []
    self.current_circuit = None

  def start(self):
    for circuit in CircuitCollection.objects:
      # self.circuit_ids.append(str(circuit.id))
      circuit.delete()

  def load_circuit(self, circuit_id):
    if (str(circuit_id) not in self.circuit_ids):
      return "The circuit with id " + str(circuit_id) + " doesn\'t exist.", None
    
    self.current_circuit = Circuit.load(circuit_id)
    return "Success", self.current_circuit.to_json()

  def add_circuit(self, label):
    circuit = Circuit.create(label)

    self.circuit_ids.append(str(circuit.id))
    self.current_circuit = circuit

    return circuit

  def get_components(self):
    # if (self.current_circuit is None):
    return self.current_circuit.components

  def add_component(self, kind):
    # if (self.current_circuit is None):
    return self.current_circuit.add_component(kind)

  def calculate_outputs(self, id):
    # if (self.current_circuit is None):
    return self.current_circuit.calculate_outputs(id)

  def set_outputs(self, id, outputs):
    # if (self.current_circuit is None):
    return self.current_circuit.set_outputs(id, outputs)

  def set_power(self, id, power):
    # if (self.current_circuit is None):
    return self.current_circuit.set_power(id, power)
    
  def set_position(self, id, x, y):
    # if (self.current_circuit is None):
    return self.current_circuit.set_position(id, x, y)
    
  def delete_component(self, id):
    # if (self.current_circuit is None):
    return self.current_circuit.delete_component(id)

  def reset(self):
    # if (self.current_circuit is None):
    self.current_circuit.reset()

  def clear(self):
    if (self.current_circuit is not None):
      self.current_circuit.delete()
      
    self.current_circuit = None

  def save(self):
    if (self.current_circuit is None):
      return "No circuit selected.", False

    try:
      self.current_circuit.save()
      return "", True
    except NotUniqueError:
      return f"Circuit \'{self.current_circuit.label}\' already exists.", False