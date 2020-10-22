from app.database.db import db
import mongoengine_goodjson as gj
from app.database.Port import Port

class Component(gj.Document):
  kind = db.StringField()
  inputs = db.ListField(db.LazyReferenceField(Port))
  outputs = db.ListField(db.LazyReferenceField(Port))
  label = db.StringField()
  x = db.IntField()
  y = db.IntField()