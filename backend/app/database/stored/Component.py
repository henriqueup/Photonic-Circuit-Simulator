from app.database.db import db
import mongoengine_goodjson as gj
from app.database.stored.Port import StoredPort

class StoredComponent(gj.Document):
  kind = db.StringField()
  inputs = db.ListField(db.LazyReferenceField(StoredPort))
  outputs = db.ListField(db.LazyReferenceField(StoredPort), required=True)
  label = db.StringField()