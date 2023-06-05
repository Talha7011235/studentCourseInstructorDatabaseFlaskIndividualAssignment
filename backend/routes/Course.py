# Talha Hussain
# Database Flask Individual Assignment
# Course.py
from flask import request
from ..models import Course
from .. import app, database

'''
The Function "create_add_course()" takes in a title and instructor ID and creates a new course in the
database.
'''
@app.route('/api/course/', methods = ['POST'])
def create_add_course():
    # Retrieve the request body.
    data = request.get_json()

    # Extract the title and instructor ID from the request.
    request_title = data.get('title')
    request_instructor_id = data.get('instructor_id')

    # Create a New Course object.
    newCourse = Course(title = request_title, instructor_id = request_instructor_id)

    # Save the Course Object to the Database.
    database.session.add(newCourse)
    database.session.commit()

    # Return the newly created course to the frontend.
    return{'id': newCourse.id, 'title': newCourse.title, 'instructor': newCourse.instructor.name}

'''
The Function "list_course()" returns a list of all courses in the database.
'''
@app.route('/api/course/', methods = ['GET'])
def list_course():
    # Request all courses.
    request_courses = Course.query.all()

    # Return the course list to the frontend.
    return[
        {'id':request_course.id,'title':request_course.title, 'instructor':request_course.instructor.name}
        for request_course in request_courses
    ]

'''
The Function "retrieve_course(id)" requests a single course from the database.
'''
@app.route('/api/course/<int:id>', methods = ['GET'])
def retrieve_course(id):
    # Request the course by "id".
    request_course = database.get_or_404(Course, id)

    # Return the course to the frontend.
    return {'id':request_course.id,'title':request_course.title, 'instructor':request_course.instructor.name}

'''
The Function "updated_modify_course(id)" receives the information from the frontend and modifies the course
in the database.
'''
@app.route('/api/course/<int:id>', methods = ['PATCH'])
def update_modify_course(id):
    # Retrieve the data from the request.
    data = request.get_json()

    # Extract the title of the course from the data.
    request_title = data.get('title')

    # Update the course by "id".
    database.session().query(Course).filter(Course.id == id).update({
        'title': request_title
    })
    database.session().commit()

    # Return the modified course to the frontend.
    request_course = database.get_or_404(Course, id)
    return {'id':id,'title':request_course.title, 'instructor':request_course.instructor.name}

'''
The Function "delete_course(id)" deletes the course requested.
'''
@app.route('/api/course/<int:id>', methods = ['DELETE'])
def delete_course(id):
    # Select the course by "id" and delete.
    database.session().query(Course).filter(Course.id == id).delete()
    database.session().commit()

    # Return the success message to the frontend.
    return {'message': 'success'}