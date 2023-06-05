import logo from './logo.svg';
import './StudentApp.css';
import { useState, useEffect } from 'react';

/**
 * The StudentApp() Component handles all of the operations for working with students and their enrollment 
 * within courses.
 * @returns Component 
 */
function StudentApp() {
  // Create a State Object to hold the student information.
  const [new_student, set_new_student] = useState({name:'', number_of_credits_earned:0})
  const [student_id, set_student_id] = useState(0)
  const [students, set_students] = useState([])
  const [courses, set_courses] = useState([])
  const [student_course, set_student_course] = useState({student_id: 0, course_id: 0, grade: 0})

  /**
   * The Function update_student_table() makes a request to the list endpoint on the students route.
   */
  function update_student_table(){
    fetch('/api/student/')                // Fetch the student endpoint.                               
      .then(response => response.json())  // Convert the response to an object.
      .then(json => {
        // Set the students variable to the converted object.
        set_students(json)
        if(json.length > 0){
          set_student_id(json[0].id)
        }
      }) 
  }

  /**
   * The Function "update_course_table" makes a request to the list endpoint on the courses route. *
   */
  function update_course_table(){
    fetch('/api/course/')                 // Fetch the course endpoint.
      .then(response => response.json())  // Convert the response to an object.
      .then(json => set_courses(json))    // Set the courses variable to the converted object.
  }

  // Use effect to request the student information while loading the web page and use effect to request the
  // course information while loading the web page.
  useEffect(()=>{
      update_student_table()
      update_course_table()
  }, [])

  /**
   * The Function add_student_course() adds a connection between the student table and course table. 
   */
  function add_student_course(){
    // Set the default student id to the first student in the list.
    if(student_course.student_id === 0){
      student_course.student_id = students[0].id
    }

    // Set the default course id to the first course in the list.
    if(student_course.course_id === 0){
      student_course.course_id = courses[0].id
    }

    // Send a POST request to create a new student course with the listed student ID, course ID, and grade.
    fetch('/api/student_course/',{
      method: 'POST',
      body: JSON.stringify(student_course),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => {
      // Inform the user of success.
      alert(json.message)

      // Update the student table.
      update_student_table()
    })
  }

  /**
   * The delete_student_course() removes the connection between the student table and course table.
   */
  function delete_student_course(){
    // Set the default to student ID to the first student in the list.
    if(student_course.student_id === 0){
      student_course.student_id = students[0].id
    }

    // Set the default to course ID to the first course in the list.
    if(student_course.course_id === 0){
      student_course.course_id = courses[0].id
    }

    // Send a DELETE to the server. In addition, send that DELETE request to remove a student course with the
    // listed student ID and course ID.
    fetch(`/api/student_course/${student_course.student_id}/${student_course.course_id}`,{
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => {
      // Inform the user of success.
      alert(json.message)

      // Update the student table.
      update_student_table()
    })
  }

  /**
   * The Function add_update_student_credit() modifies the student to have one extra credit.
   */
  function add_update_student_credit(){
    // Use student ID to select the appropriate student.
    let update_student = students.find(student=>student.id===student_id)

    // Send a PATCH request that updates the number of credits earned.
    fetch(`/api/student/${student_id}`,{
      method: 'PATCH',
      body: JSON.stringify({
        name: update_student.name, 
        number_of_credits_earned: update_student.number_of_credits_earned + 1
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => update_student_table())
  }

  /**
   * The Function "create_and_add_student()" creates a new student with the listed name and number of
   * credits earned.
   */
  function create_and_add_student(){
    // Send a POST request to create a new course with the listed instructor and title.
    fetch('/api/student/',{
      method: 'POST',
      body: JSON.stringify(new_student),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(() => window.location.reload())
  }

  /**
   * The Function "delete_student()" deletes the student that has been selected. *
   */
  function delete_student(){
    // Send a DELETE to the server. In addition, send that DELETE request to remove a student with the
    // listed student ID.
    fetch(`/api/student/${student_id}`,{
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => {
      // Inform the user of success. 
      alert(json.message)

      // Reload the window automatically. 
      window.location.reload()
    })
  }
  return (
    <div className="StudentApp">
      <header className="StudentApp-header">
        <img src={logo} className="StudentApp-logo" alt="logo" />
        <p>
          Student Table
        </p>
        <table>
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                name
              </th>
              <th>
                number_of_credits_earned
              </th>
              <th>
                courses
              </th>
              <th>
                grade
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map(student=><tr><td>{student.id}</td><td>{student.name}</td><td>{student.number_of_credits_earned}</td><td dangerouslySetInnerHTML={{__html:student.courses.map(course=>course.title).join('<br/>')}}></td><td dangerouslySetInnerHTML={{__html:student.courses.map(course=>course.grade).join('<br/>')}}></td></tr>)}
          </tbody>
        </table>
        <label>
          Student: <select value={student_id} onChange={(event)=>set_student_id(parseInt(event.target.value))}>
            {students.map(student=> <option value={student.id}>{student.name}</option>)}
          </select>

        </label>
        <button onClick={add_update_student_credit}>Add Credit</button>
        <hr/>
        <label>
          name: <input value={new_student.name} onChange={(event)=>set_new_student({name:event.target.value,number_of_credits_earned:new_student.number_of_credits_earned})}/>
        </label>
        <label>
          number of credits earned: <input type="number" min="0" value={new_student.number_of_credits_earned} onChange={(event)=>set_new_student({name:new_student.name,number_of_credits_earned:parseInt(event.target.value)})}/>
        </label>
        <button onClick={create_and_add_student}>Add Student</button> 
        <hr/>
        <label>
          Student: <select value={student_id} onChange={(event)=>set_student_id(parseInt(event.target.value))}>
            {students.map(student=> <option value={student.id}>{student.name}</option>)}
          </select>

        </label>
        <button onClick={delete_student}>Delete Student</button>
        <hr/>
        <label>
          Student: <select value={student_course.student_id} onChange={(event)=>set_student_course({student_id:event.target.value,course_id:student_course.course_id, grade:student_course.grade})}>
            {students.map(student=> <option value={student.id}>{student.name}</option>)}
          </select>

        </label>
        <label>
          Course: <select value={student_course.course_id} onChange={(event)=>set_student_course({student_id:student_course.student_id,course_id:event.target.value, grade:student_course.grade})}>
            {courses.map(course=> <option value={course.id}>{course.title}</option>)}
          </select>
        </label>
        <label>
          grade: <input type="number" min="0" max="100" value={student_course.grade} onChange={(event)=>{
            let grade = parseInt(event.target.value)
            grade = Math.max(0, grade)
            grade = Math.min(100, grade)
            set_student_course({student_id:student_course.student_id,course_id:student_course.course_id, grade:grade})
          }}/>
        </label>
        <button onClick={add_student_course}>Add/Update Student Course</button>
        <br/>
        <button onClick={delete_student_course}>Delete Student Course</button>
      </header>
    </div>
  );
}

// Export the primary function for use in another module. 
export default StudentApp;
