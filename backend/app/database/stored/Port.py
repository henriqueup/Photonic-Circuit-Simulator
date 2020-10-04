from app.database.db import db
import mongoengine_goodjson as gj

class StoredPort(gj.Document):
  target = db.LazyReferenceField('self')
  power = db.DecimalField(default=0)