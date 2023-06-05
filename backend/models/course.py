# Talha Hussain
# Database Flask Individual Assignment
# course.py
from .. import database

'''
class Course()
Database Model representing a course connected with students and instructors.
'''
class Course(database.Model):
    __table_args__ = {'extend_existing':True}
    id = database.Column(database.Integer, primary_key = True)
    instructor_id = database.Column(database.Integer, database.ForeignKey('instructor.id'))
    title = database.Column(database.String)
    student_course = database.relationship('Student_Course', backref = 'course')
