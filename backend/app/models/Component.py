class Component:
  def __init__(self):
    self.kind = "base"
    self.inputs = []  #Ports
    self.outputs = [] #Ports
    self.label = ""

  def calculateOutputs(self):
    raise NotImplementedError