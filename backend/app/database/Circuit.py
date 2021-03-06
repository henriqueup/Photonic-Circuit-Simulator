from app.database.db import db
import mongoengine_goodjson as gj
from app.database.Component import Component

class Circuit(gj.Document):
  id = db.ObjectIdField(primary_key=True)
  label = db.StringField(required=True, unique=True)
  components = db.ListField(db.LazyReferenceField(Component))