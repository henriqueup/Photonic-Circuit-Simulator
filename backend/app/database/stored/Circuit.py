from app.database.db import db
import mongoengine_goodjson as gj
from app.database.stored.Component import StoredComponent

class StoredCircuit(gj.Document):
  label = db.StringField(required=True, unique=True)
  components = db.ListField(db.LazyReferenceField(StoredComponent))