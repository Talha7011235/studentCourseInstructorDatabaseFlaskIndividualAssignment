import logo from './logo.svg';
import './CourseApp.css';
import { useState, useEffect } from 'react';

/**
 * The CourseApp() Component handles all of the operations for working with courses.
 * @returns Component
 */
function CourseApp() {
  // Create a State Object to hold the course information.
  const [new_course, set_new_course] = useState({instructor_id:0, title:''})
  const [course_id, set_course_id] = useState(0)
  const [courses, set_courses] = useState([])
  const [modify_course_title, set_modify_course_title] = useState('')
  const [instructors, set_instructors] = useState([])

  /**
   * The Function update_course_table() makes a request to the list endpoint on the courses route.
   */
  function update_course_table(){
    fetch('/api/course/')                 // Fetch the course endpoint.
      .then(response => response.json())  // Convert the response to an object.
      .then(json => {set_courses(json)    // Set the courses variable to the converted object.

      // Create an if statement for the condition that if there is a resulting course, .....
      if(json.length > 0){
        // ....then the default course is set to the first available course.
        set_course_id(json[0].id)         
      }})
  }

  /**
   * The Function update_instructors()
   * makes a request to the list endpoint on the instructors route.
   */
  function update_instructors(){
    fetch('/api/instructor/')               // Fetch the instructor endpoint.
      .then(response => response.json())    // Convert the response to an object.
      .then(json => {set_instructors(json)  // Set the instructors variable to the converted object.

    // If we have a resulting instructor.
    if (json.length > 0){
      // Set the default instructor to our first available instructor while maintaining the title.
      set_new_course({instructor_id: json[0].id, title: new_course.title})
    }
    })
  }

  // Use effect to request the course information while loading the web page and use the effect to
  // request the instructors information while loading the web page.
  useEffect(()=>{
    update_course_table()
    update_instructors()
  }, [])

  /**
   * The Function update_course() updates the title of the course selected and automatically refreshes the 
   * courses table.
   */
  function update_course(){
    // Send an update request to the "course_id" endpoint in courses.
    fetch(`/api/course/${course_id}`,{
      method: 'PATCH',
      body: JSON.stringify({
        // Set the title to the modified course title.
        title: modify_course_title, 
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(() => update_course_table()) // Request and update the course table.
  }

  /**
   * The Function create_and_add_course() creates a new course with the listed instructor and title.
   */
  function create_and_add_course(){
    // Send a POST request to create a new course with the listed instructor and title.
    fetch('/api/course/',{
      method: 'POST',
      body: JSON.stringify(new_course),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(() => window.location.reload()) // Reload the window when complete.
  }

  /**
   * The Function delete_course() deletes the course that has been selected.
   */
  function delete_course(){
    fetch(`/api/course/${course_id}`,{
      method: 'DELETE',
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json()).then(json => {
      // Inform the user of the result.
      alert(JSON.stringify(json, null, 2))
      
      // Reload the window automatically.
      window.location.reload()
    })
  }
  return (
    <div className="CourseApp">
      <header className="CourseApp-header">
        <img src={logo} className="CourseApp-logo" alt="logo" />
        <p>
          Course Table
        </p>
        <table>
          <thead>
            <tr>
              <th>
                id
              </th>
              <th>
                title
              </th>
              <th>
                instructor
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course=><tr><td>{course.id}</td><td>{course.title}</td><td>{course.instructor}</td></tr>)}
          </tbody>
        </table>
        {/*  */}
        <label>
          Course: <select value={course_id} onChange={(event)=>set_course_id(event.target.value)}>
            {courses.map(course=> <option value={course.id}>{course.title}</option>)}
          </select>
        </label>
        <label>
          title: <input type="text" value={modify_course_title} onChange={(event)=>set_modify_course_title(event.target.value)}/>
        </label>
        <button onClick={update_course}>Update Title</button>
        <hr/>
        <label>
          instructor: <select value={new_course.instructor_id} onChange={(event)=>set_new_course({instructor_id:event.target.value,title:new_course.title})}>
            {instructors.map(instructor=> <option value={instructor.id}>{instructor.name}</option>)}
          </select>
        </label>
        <label>
          title: <input type="text" value={new_course.title} onChange={(event)=>set_new_course({instructor_id:new_course.instructor_id,title:event.target.value})}/>
        </label>
        <button onClick={create_and_add_course}>Add Course</button> 
        <hr/>
        <label>
          Course: <select value={course_id} onChange={(event)=>set_course_id(event.target.value)}>
            {courses.map(course=> <option value={course.id}>{course.title}</option>)}
          </select>
        </label>
        <button onClick={delete_course}>Delete Course</button>
      </header>
    </div>
  );
}

// Export the primary function for use in another module.
export default CourseApp;
