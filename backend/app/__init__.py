from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#import the blueprints
from app.blueprints.components import components_bp
from app.blueprints.circuits import circuits_bp

#register the blueprints
app.register_blueprint(components_bp)
app.register_blueprint(circuits_bp)