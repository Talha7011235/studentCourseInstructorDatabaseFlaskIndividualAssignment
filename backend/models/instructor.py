# Talha Hussain
# Database Flask Individual Assignment
# instructor.py
from .. import database

'''
class Instructor()
Database Model representing a instructor connected with courses.
'''
class Instructor(database.Model):
    __table_args__ = {'extend_existing':True}
    id = database.Column(database.Integer, primary_key = True)
    name = database.Column(database.String)
    course_department = database.Column(database.String)
    courses = database.relationship('Course', backref = 'instructor')