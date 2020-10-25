from flask import Blueprint, request, Response, jsonify
from app.resources.controller import controller

circuits_bp = Blueprint('circuits', __name__, url_prefix='/circuits')

@circuits_bp.route('')
def index():
  circuits = controller.list_circuits()
  return jsonify(circuits), 200

@circuits_bp.route('', methods=['POST'])
def create():
  label = request.get_json().get('label')
  if (label is None):
    return "Bad Request", 400

  circuit = controller.add_circuit(label)
  return jsonify(circuit.to_json()), 200

@circuits_bp.route('/reset', methods=['DELETE'])
def reset():
  controller.reset()
  return "OK", 200

@circuits_bp.route('/<id>')
def load_circuit(id):
  response, loaded = controller.load_circuit(id)

  if (loaded is None):
    return response, 400

  return loaded, 200

@circuits_bp.route('/save', methods=['POST'])
def save():
  response, saved = controller.save()

  if (not saved):
    return response, 400

  return "OK", 200
  
@circuits_bp.route('/set_label', methods=['POST'])
def set_label():
  label = request.get_json().get('label')
  if (label is None):
    return "Bad Request", 400
  
  response, saved = controller.set_label(label)

  if (not saved):
    return response, 400

  return "OK", 200

