from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import Engine
from sqlalchemy import event
import os
import sqlite3

database = SQLAlchemy()
app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY = 'dev',
    SQLALCHEMY_DATABASE_URI = r"sqlite:///C:\\Users\syedr\Documents\databaseFlask\backend\sqlite.db"
)

@event.listens_for(Engine, 'connect')
def activate_foreign_keys(connection, connection_record):
    if type(connection) is sqlite3.Connection:
        cursor = connection.cursor()
        cursor.execute('PRAGMA foreign_keys=ON')
        cursor.close()

database.init_app(app)
with app.app_context():
    database.reflect()
       
print(database.metadata.tables.keys())
try:
    os.makedirs(app.instance_path)
except OSError:
    pass
from .routes import *