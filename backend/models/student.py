# Talha Hussain
# Database Flask Individual Assignment
# student.py
from .. import database

'''
class Student()
Database Model representing a student connected with courses.
'''
class Student(database.Model):
    __table_args__ = {'extend_existing':True}
    id = database.Column(database.Integer, primary_key = True)
    name = database.Column(database.String)
    number_of_credits_earned = database.Column(database.Integer)
    student_course = database.relationship('Student_Course', backref = 'student')

    