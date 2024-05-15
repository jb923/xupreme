from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
import os

from app.routes import api
from app.models.models import db
from app.config import Configuration

if os.environ.get("FLASK_ENV") == 'production':
  app = Flask(__name__, static_folder='./xupreme/build/static', static_url_path='/static')
else:
  app = Flask(__name__)

CORS(app)
app.config.from_object(Configuration)

db.init_app(app)
Migrate(app, db)

app.register_blueprint(api.bp)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    try:
        print(f'caught_path: {path}')
        path_dir = os.path.abspath("./xupreme/build") #path react build
        file_exists = os.path.exists(f'./xupreme/build/static/{path}')
        print(f'File exists: {file_exists}')
        if path and file_exists:
            return send_from_directory(os.path.join(path_dir), path)
        else:
            return send_from_directory(os.path.join(path_dir),'index.html')
    except Exception as e:
        print(f'Failed to serve static file: {e}')
        return str(e), 500
