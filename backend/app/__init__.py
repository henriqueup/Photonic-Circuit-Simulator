from flask import Flask

app = Flask(__name__)

#import the blueprints
from app.blueprints.public import public_bp

#register the blueprints
app.register_blueprint(public_bp)