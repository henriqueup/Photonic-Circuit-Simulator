from app.database.db import db
import mongoengine_goodjson as gj

class Port(gj.Document):
  id = db.ObjectIdField(primary_key=True)
  target = db.LazyReferenceField('self')
  power = db.DecimalField(default=0)