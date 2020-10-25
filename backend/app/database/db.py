from flask_mongoengine import MongoEngine
from bson import objectid

db = MongoEngine()

def initialize_db(app):
  db.init_app(app)

def get_objectid():
  return objectid.ObjectId()