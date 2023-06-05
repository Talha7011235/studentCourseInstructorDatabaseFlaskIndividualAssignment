## Talha Hussain Student Course Instructor Database Flask Individual Assignment
# Summary:
This project was a great introduction to using a two stage web application system with a separate backend and frontend. I started by defining the Student Course Instructor Entity Relationship ER Diagram Using Crow's Foot and setting up the flask installation to work as a Create Read Update and Delete Application Programming Interface, in other words the CRUD API, for ease of accessing and modifying the database. Once I was satisfied with the ability to send GET, POST, PATCH, and DELETE requests, I installed the React project in the frontend folder. The frontend is based on functionality over style with each module as it's own separte component that can add, delete, modify, view, and modify the data in the database. In addition, when it comes to the many to many relationship between student and course in the database, the student component is able to enroll and remove students from the courses. I did this using state variables, data binding on some tables, and select elements to ensure the correct data is used in the relational areas as defined by the foreign keys in the SQLite database.  
        
# Installation Directions:
1. On a Windows Operating System, ensure that the "ExecutionPolicy" is set to RemoteSign by typing the
     command "set ExecutionPolicy-RemoteSign" as a result of right clicking the Windows Start menu in the left-hand corner of your screen and then going to and left clicking "Windows PowerShell (Admin)".

2. Install virtual environment.
    - python -m pip install --user virtualenv

3. Activate virtual environment.
    - python -m venv venv
    - ./venv/Scripts/activate

4. If virtual environment does not successfully activate, then exit out of the virtual environment "(venv)" by
    first typing the command "deactivate" to deactivate the virtual environment and pressing the "Enter" key on your computer keyboard to execute that command. Then, type the command "rm -r venv" in order to        delete the "venv" directory. Repeat Step 2 for installing the virtual environment and repeat Step 3 for activating the virtual environment. In other words, do Step 2 and Step 3 again only if you encountered an error and was unable to activate the virtual environment. If you did not encounter any error and were able to activate the virtual environment, then ignore Step 4.

5. Install packages.
    - python -m pip install flask
    - python -m pip install flask-sqlalchemy
    
6. Install Node Modules.
    - cd frontend
    - npm install 

# Running Directions:
1. Activate backend environment.
    - ./venv/Scripts/activate
    - flask --app backend run
    
2. Activate frontend environment.
    - cd frontend
    - npm run start