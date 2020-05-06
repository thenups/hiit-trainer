#################################################
# Dependencies
#################################################
import numpy as np

from flask import Flask, render_template, jsonify, redirect
from flask import Response
from flask_cors import CORS
# from flask_compress import Compress

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import Session, sessionmaker, scoped_session, Query
# from sqlalchemy import create_engine, func, inspect, Column, Integer, String

import os


#################################################
# Engine Setup
#################################################


#################################################
# Flask Setup
#################################################
# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

#################################################
# Flask Routes
#################################################
# # Full dashboard
# @app.route('/')
# def index():
#     """Return the  homepage."""

#     return render_template('index.html')

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


if __name__ == '__main__':
    app.run()
