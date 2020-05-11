#################################################
# Dependencies
#################################################
import numpy as np
import uuid

from flask import Flask, render_template, jsonify, redirect, request
from flask import Response
from flask_cors import CORS
# from flask_compress import Compress

# from flask_pymongo import PyMongo
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import Session, sessionmaker, scoped_session, Query
# from sqlalchemy import create_engine, func, inspect, Column, Integer, String

import os

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
# MongoDB Setup
#################################################
# MONGO_URL = os.environ.get('MONGO_URL')
# if not MONGO_URL:
#     MONGO_URL = "mongodb://<dbuser>:<dbpassword>@ds255857.mlab.com:55857/heroku_vd9z8ksv";

# app.config["MONGO_URI"] = MONGO_URL
# mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################
# # Full dashboard
# @app.route('/')
# def index():
#     """Return the  homepage."""

#     return render_template('index.html')

WORKOUTS = [
    {
        'id': uuid.uuid4().hex,
        'exercises': [
            {
                'name': 'some exercise',
                'time': 8
            }
        ],
        'reps': 5,
    },
    {
        'id': uuid.uuid4().hex,
        'exercises': [
            {
                'name': 'another exercise',
                'time': 7
            }
        ],
        'reps': 4,
    },
    {
        'id': uuid.uuid4().hex,
        'exercises': [
            {
                'name': 'third exercise',
                'time': 6
            }
        ],
        'reps': 3,
    },
]

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

# Workouts Endpoint to GET and POST
@app.route('/api/workouts', methods=['GET', 'POST'])
def all_workouts():
    response_object = {'status': 'success'}

    # What to do for post
    if request.method == 'POST':
        #Get get data from form
        post_data = request.get_json()
        #Add to DB
        docu = {
                'reps': post_data.get('reps'),
                'exercises': post_data.get('exercises'),
                'tags': post_data.get('tags')
            }
        
        mongo.db.workouts.insert_one(docu)

        response_object['message'] = 'Workout added!'

    # What to do for GET
    else:
        #Send all exercises
        response_object['workouts'] = mongo.db.workouts

    # return response
    return jsonify(response_object)

if __name__ == '__main__':
    app.run()
