from app.database.db import db
import mongoengine_goodjson as gj
from app.database.Component import Component

class Circuit(gj.Document):
  label = db.StringField()
  components = db.ListField(db.LazyReferenceField(Component))