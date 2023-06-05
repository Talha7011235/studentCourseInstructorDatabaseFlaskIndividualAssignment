# Talha Hussain
# Database Flask Individual Assignment
# student_course.py
from .. import database
'''
class Student_Course()
Database Model representing a connection between a student and a course.
'''
class Student_Course(database.Model):
    __table_args__ = {'extend_existing':True}
    __tablename__ = 'student_course'
    student_id = database.Column(database.Integer, database.ForeignKey('student.id'), primary_key = True)
    course_id = database.Column(database.Integer, database.ForeignKey('course.id'), primary_key = True)
    grade = database.Column(database.Integer)