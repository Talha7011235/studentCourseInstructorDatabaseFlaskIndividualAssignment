# Talha Hussain
# Database Flask Individual Assignment
# Instructor.py
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from ..models import Instructor
from .. import app, database

'''
The Function "create_add_instructor()" takes in a name and course department and creates a new instructor
in the database.
'''
@app.route('/api/instructor/', methods = ['POST'])
def create_add_instructor():
    # Retrieve the request body.
    data = request.get_json()

    # Extract the name and course department from the request.
    request_name = data.get('name')
    request_course_department = data.get('course_department')

    # Create a New Instructor Object.
    newInstructor = Instructor(name = request_name, course_department = request_course_department)

    # Save the Instructor Object to the Database.
    database.session.add(newInstructor)
    database.session.commit()

    # Return the newly created Instructor to the frontend.
    return{'id': newInstructor.id, 'name': newInstructor.name, 'course_department': newInstructor.course_department}

'''
The "list_instructor()" returns a list of all instructors in the database.
'''
@app.route('/api/instructor/', methods = ['GET'])
def list_instructor():
    # Request all instructors.
    request_instructor = Instructor.query.all()

    # Return the instructor list to frontend.
    return[
        {'id': request_instructor.id, 'name': request_instructor.name, 'course_department': request_instructor.course_department}
        for request_instructor in request_instructor
    ]

'''
The Function "retrieve_instructor(id)" requests a single instructor from the database.
'''
@app.route('/api/instructor/<int:id>', methods = ['GET'])
def retrieve_instructor(id):
    # Request the instructor by "id".
    request_instructor = database.get_or_404(Instructor, id)

    # Return the instructor to the frontend. 
    return {'id':request_instructor.id, 'name':request_instructor.name, 'course_department':request_instructor.course_department}

'''
The Function "update_modify_instructor(id)" receives the information from the frontend and modifies the
instructor in the database.
'''
@app.route('/api/instructor/<int:id>', methods = ['PATCH'])
def update_modify_instructor(id):
    # Retrieve the data from the request.
    data = request.get_json()

    # Extract name and course department from the data variable.
    request_name = data.get('name')
    request_course_department = data.get('course_department')

    # Update the instructor by "id".
    database.session().query(Instructor).filter(Instructor.id == id).update({
        'name':request_name, 'course_department':request_course_department
    })
    database.session().commit()

    # Return the modified instructor to the frontend.
    return {'id':id, 'name':request_name, 'course_department':request_course_department}

'''
The "delete_instructor(id)" Function deletes the instructor requested.
'''
@app.route('/api/instructor/<int:id>', methods = ['DELETE'])
def delete_instructor(id):
    # Request the instructor by "id" and delete.
    database.session().query(Instructor).filter(Instructor.id == id).delete()
    database.session().commit()

    # Return the success message to the frontend.
    return {'message': 'success'}