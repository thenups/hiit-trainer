#################################################
# Dependencies
#################################################
# import numpy as np
import uuid

from flask import Flask, render_template, jsonify, redirect, request
from flask import Response
from flask_cors import CORS
# from flask_compress import Compress

from flask_pymongo import PyMongo
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
MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    MONGO_URL = 'mongodb://localhost:27017/rest';

app.config["MONGO_URI"] = MONGO_URL
mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

# Workouts Endpoint to GET and POST
@app.route('/api/1.0/workouts', methods=['GET', 'POST'])
def all_workouts():
    response_object = {'status': 'success'}

    # What to do for post
    if request.method == 'POST':
        #Get get data from form
        post_data = request.get_json()
        #Add to DB
        mongo.db.workouts.insert_one(post_data)

        response_object['message'] = 'Workout added!'

    # What to do for GET
    else:
        #Send all exercises
        response_object['workouts'] = mongo.db.workouts

    # return response
    return jsonify(response_object)

@app.route('/books', methods=['GET', 'POST'])
def all_books():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()

        book = {
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
            }
        
        mongo.db.books.insert_one(book)

        response_object['message'] = 'Book added!'
    else:
        response_object['books'] = mongo.db.books
    return jsonify(response_object)

if __name__ == '__main__':
    app.run()
