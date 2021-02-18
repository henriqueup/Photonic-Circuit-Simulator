from mongoengine import NotUniqueError
from app.models.Circuit import Circuit
from app.database.Circuit import Circuit as CircuitCollection
from app.resources.errors import Error

class Controller:
  def __init__(self):
    self.circuits = []
    self.current_circuit = None

  def get_circuit(self, circuit_id):
    return next((x for x in self.circuits if str(x.id) == str(circuit_id)), None)

  def load_circuit(self, circuit_id):
    circuit = self.get_circuit(circuit_id)

    self.current_circuit = circuit
    if (circuit is not None):
      return "Success", circuit

    if (str(circuit_id) not in [str(x.id) for x in CircuitCollection.objects]):
      return "The circuit with id " + str(circuit_id) + " doesn\'t exist.", None
    
    self.current_circuit = Circuit.load(circuit_id)
    
    self.circuits.append(self.current_circuit)
    return "Success", self.current_circuit

  def add_circuit(self, label):
    circuit = Circuit.create(label)

    self.circuits.append(circuit)
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
    if (self.current_circuit is not None):
      self.current_circuit.reset()
      
    self.current_circuit = None
    self.circuits = []

  def save(self):
    if (self.current_circuit is None):
      return "No circuit selected.", False

    try:
      self.current_circuit.save()
      return "", True
    except NotUniqueError:
      return f"Circuit \'{self.current_circuit.label}\' already exists.", False

  def set_circuit_label(self, label):
    if (self.current_circuit is None):
      return "No circuit selected.", False

    self.current_circuit.label = label
    return "", True

  def list_circuits(self):
    circuits = []
    for circuit in CircuitCollection.objects:
      circuits.append({'id': str(circuit.id), 'label': circuit.label})

    return circuits

  def set_current_circuit(self, circuit_id):
    circuit = self.get_circuit(circuit_id)

    if (circuit is None):
      return f"The circuit with id \'{circuit_id}\' doesn\'t exist."

    self.current_circuit = circuit
    return None

  def close_circuit(self, circuit_id):
    circuit = self.get_circuit(circuit_id)

    if (circuit is None):
      return Error.inexistent_circuit_error(circuit_id)

    del self.circuits[self.circuits.index(circuit)]
    return None

  def set_component_label(self, component_id, label):
    if (self.current_circuit is None):
      return "No circuit selected.", False

    response, success = self.current_circuit.set_label(component_id, label)
    return response, success
