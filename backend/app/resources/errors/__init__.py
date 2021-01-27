class Error():
  def __init__(self, code, message):
    self.code = code
    self.message = message

  @classmethod
  def inexistent_circuit_error(cls, circuit_id):
    return cls("INEXISTENT_CIRCUIT_ERROR", f"The circuit with id \'{circuit_id}\' doesn\'t exist.")
