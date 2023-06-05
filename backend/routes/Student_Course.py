# Talha Hussain
# Database Flask Individual Assignment
# Student_Course.py
from flask import request
from ..models import Student_Course
from .. import app, database

'''
The create_student_course() Function unites the student table and course table through the pivot and provides
a grade.
'''
@app.route('/api/student_course/', methods = ['POST'])
def create_student_course():
    # Retrieve the body of the request.
    data = request.get_json()

    # Extract the grade, student ID, and course ID from the data variable.
    request_grade = data.get('grade')
    request_student_id = data.get('student_id')
    request_course_id = data.get('course_id')

    # Check to see if the student is already enrolled.
    request_student_course = Student_Course.query.get((request_student_id, request_course_id))
    if request_student_course:
        # If so, update the student.
        request_student_course.grade = request_grade
    else:
        # Otherwise, create the Student Course Object with the grade, student ID, and course ID.
        newCourse = Student_Course(student_id = request_student_id, course_id = request_course_id, grade = request_grade)

        # Save the Student Course Object into the Database.
        database.session.add(newCourse)
    database.session.commit()

    # Return the success message.
    return {'message': 'success'}

'''
The Function "retrieve_student_course(student_id, course_id)" takes in a student ID and course ID and
returns the connection between the student table and course table.
'''
@app.route('/api/student_course/<int:student_id>/<int:course_id>', methods = ['GET'])
def retrieve_student_course(student_id, course_id):
    # Request the student course via listed IDs from the database.
    request_student_course = database.get_or_404(Student_Course, [student_id, course_id])

    # Return the student and course connected along with the grade.
    return {'student':request_student_course.student.name, 'course':request_student_course.course.title, 'grade':request_student_course.grade}

'''
The Function "update_modify_student_course(student_id, course_id)" updates the grade value on the student
course connection.
'''
@app.route('/api/student_course/<int:id>', methods = ['PATCH'])
def update_modify_student_course(student_id, course_id):
    # Retrieve the data from the request.
    data = request.get_json()

    # Extract the grade from the data variable.
    request_grade = data.get('grade')
    #request_student_course.grade = request_grade
    # Select the appropriate student course and update the "grade".
    database.session().query(Student_Course).filter(Student_Course.student_id == student_id and Student_Course.course_id == course_id).update({'grade': request_grade})
    database.session().commit()

    # Retrieve the updated student course.
    request_student_course = database.get_or_404(Student_Course, [student_id, course_id])

     # Return the student and course connected along with the grade.
    return {'student':request_student_course.student.name, 'course':request_student_course.course.title, 'grade':request_student_course.grade}

'''
The Function "delete_student_course(student_id, course_id)" delete the requested student course from the
database.
'''
@app.route('/api/student_course/<int:student_id>/<int:course_id>', methods = ['DELETE'])
def delete_student_course(student_id, course_id):
    # Select the appropriate student course and delete the student course.
    database.session().query(Student_Course).filter(Student_Course.student_id == student_id and Student_Course.course_id == course_id).delete()
    database.session().commit()

    # Return the success message to the frontend.
    return {'message': 'success'}