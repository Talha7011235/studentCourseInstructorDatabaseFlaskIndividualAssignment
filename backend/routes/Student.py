# Talha Hussain
# Database Flask Individual Assignment
# Student.py
from flask import request
from ..models import Student
from .. import app, database

'''
The Function "create_add_student()" takes in a name and number of credits earned and creates a new student
in the database.
'''
@app.route('/api/student/', methods = ['POST'])
def create_add_student():
    # Retrieve the request body.
    data = request.get_json()

    # Extract the name and number of credits earned from the request.
    request_name = data.get('name')
    request_number_of_credits_earned = data.get('number_of_credits_earned')

    # Create a New Student Object.
    newStudent = Student(name = request_name, number_of_credits_earned = request_number_of_credits_earned)

    # Save the Student Object to the Database.
    database.session.add(newStudent)
    database.session.commit()

    # Return the newly created student to the frontend.
    return{
        'id': newStudent.id, 
        'name': newStudent.name, 
        'number_of_credits_earned': newStudent.number_of_credits_earned,
        'courses': []
        }

'''
The Function "list_student()" returns a list of all students in the database.
'''
@app.route('/api/student/', methods = ['GET'])
def list_student():
    # Request all students.
    request_students = Student.query.all()
    
    # Return the student list to frontend.
    return[
        {
        'id': request_student.id, 
        'name': request_student.name, 
        'number_of_credits_earned': request_student.number_of_credits_earned,
        'courses': [{'id': student_course.course.id, 'title': student_course.course.title, 'instructor': student_course.course.instructor.name, 'grade': student_course.grade} for student_course in request_student.student_course]
        }
        for request_student in request_students
    ]

'''
The Function "retrieve_student(id)" requests a single student from the database.
'''
@app.route('/api/student/<int:id>', methods = ['GET'])
def retrieve_student(id):
    # Request the student by "id".
    request_student = database.get_or_404(Student, id)

    # Return the student to the frontend.
    return{'id': request_student.id, 'name': request_student.name, 'number_of_credits_earned': request_student.number_of_credits_earned}

'''
The Function "update_modify_student(id)" receives the information from the frontend and modifies the student
in the database.
'''
@app.route('/api/student/<int:id>', methods = ['PATCH'])
def update_modify_student(id):
    # Retrieve the data from the request.
    data = request.get_json()

    # Extract name and number of credits from the data.
    request_name = data.get('name')
    request_number_of_credits_earned = data.get('number_of_credits_earned')
    
    # Update the student by "id".
    database.session().query(Student).filter(Student.id == id).update({
        'name': request_name,
        'number_of_credits_earned': request_number_of_credits_earned
    })
    database.session().commit()

    # Return the modified student to the frontend.
    return{'id': id, 'name': request_name, 'number_of_credits_earned': request_number_of_credits_earned}

'''
The Function "delete_student(id)" deletes the student requested.
'''
@app.route('/api/student/<int:id>', methods = ['DELETE'])
def delete_student(id):
    # Select the student by "id" and delete.
    database.session().query(Student).filter(Student.id == id).delete()
    database.session().commit()

    # Return the success message to the frontend.
    return {'message': 'success'}
