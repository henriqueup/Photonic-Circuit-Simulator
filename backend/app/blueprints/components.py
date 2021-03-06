from flask import Blueprint, request, Response, jsonify
from app.resources.controller import controller

components_bp = Blueprint('components', __name__)

@components_bp.route('/')
def index():
  return {"message": "Hello World!"}

@components_bp.route('/data')
def show_data():
  components = [x.to_json() for x in controller.get_components()]
  return jsonify(components), 200

@components_bp.route('/data', methods=['POST'])
def create_data():
  try:
    kind = request.get_json().get('kind')

    if (kind == None):
      return "Bad Request", 400

    component = controller.add_component(kind)
    return jsonify(component.to_json()), 200

  except Exception as e:
    return "Exception: " + str(e), 500

@components_bp.route('/data/<id>', methods=['DELETE'])
def delete_component(id):
  response = controller.delete_component(id)

  if (response != None):
    return response, 400
  
  return "OK", 200

@components_bp.route('/data/<id>/calculate_outputs')
def calculate_outputs(id):
  outputs = controller.calculate_outputs(id)
  if (outputs == None):
    return "Component with id: " + str(id) + " doesn\'t exist.", 400

  return jsonify(outputs), 200

@components_bp.route('/data/<id>/set_outputs', methods=['PUT'])
def set_outputs(id):
  body = request.get_json()
  if (not 'outputs' in body or not isinstance(body['outputs'], list)):
    return "Body doesn\'t have an \'outputs\' list field.", 400

  for output in body['outputs']:
    if (not 'id' in output or not 'target' in output):
      return "Outputs don\'t have the required fields (\'id\' and \'target\').", 400

  response, component = controller.set_outputs(id, body['outputs'])
  
  if (component == None):
    return response, 400

  return jsonify(component.to_json()), 200

@components_bp.route('/data/<id>/set_power', methods=['PUT'])
def set_power(id):
  body = request.get_json()
  if (not 'power' in body or (not isinstance(body['power'], float) and not isinstance(body['power'], int))):
    return "Request doesn\'t have a \'power\' float field.", 400

  response, component = controller.set_power(id, body['power'])

  if (component == None):
    return response, 400

  return jsonify(component.to_json()), 200

@components_bp.route('/data/<id>/set_position', methods=['PUT'])
def set_position(id):
  body = request.get_json()
  if (not 'x' in body or not isinstance(body['x'], int)):
    return "Request doesn\'t have an \'x\' int field.", 400
  if (not 'y' in body or not isinstance(body['y'], int)):
    return "Request doesn\'t have an \'y\' int field.", 400

  response, component = controller.set_position(id, body['x'], body['y'])

  if (component == None):
    return response, 400

  return jsonify(component.to_json()), 200
  
@components_bp.route('/data/<id>/set_label', methods=['PUT'])
def set_label(id):
  body = request.get_json()
  if (not 'label' in body or not isinstance(body['label'], str)):
    return "Request doesn\'t have an \'label\' string field.", 400

  response, success = controller.set_component_label(id, body['label'])

  if (not success):
    return response, 400

  return response, 200
