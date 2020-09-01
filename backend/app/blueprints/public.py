from flask import Blueprint, request, Response, jsonify
from app.resources.controller import controller

public_bp = Blueprint('public', __name__)

@public_bp.route('/')
def index():
  return "Hello World!"

@public_bp.route('/data')
def show_data():
  components = [x.to_json() for x in controller.components]
  return jsonify(components), 200


@public_bp.route('/data', methods=['POST'])
def create_data():
  try:
    kind = request.get_json().get('kind')

    if (kind == None):
      return "Bad Request", 400

    controller.add_component(kind)
    return "OK", 200

  except Exception as e:
    return "Exception: " + str(e), 500

@public_bp.route('/data/<id>/calculate_outputs')
def calculate_outputs(id):
  outputs = controller.calculate_outputs(id)
  if (outputs == None):
    return "Component with id: " + str(id) + " doesn't exist.", 400

  return jsonify(outputs), 200

@public_bp.route('/data/<id>/set_outputs', methods=['PUT'])
def set_outputs(id):
  body = request.get_json()
  if (not hasattr(body, 'outputs') or not isinstance(body.outputs, list)):
    return "Body doesn't have an \'outputs\' list field.", 400

  for output in body.outputs:
    if (not hasattr(output, 'id') or not hasattr(output, 'target')):
      return "Outputs don't have the required fields (\'id\' and \'target\').", 400

  status, component = controller.set_outputs(id, body.outputs)
  
  if (component == None):
    return status, 400

  return jsonify(component), 200
