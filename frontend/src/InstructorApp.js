import logo from './logo.svg';
import './InstructorApp.css';
import { useState, useEffect } from 'react';

/**
 * InstructorApp() Component
 * handles all of the operations for working with instructors.
 * @returns Component 
 */
function InstructorApp() {
  // Create a State Object to hold the instructor information.
  const [new_instructor, set_new_instructor] = useState({name:'', course_department:''})
  const [instructor_id, set_instructor_id] = useState(0)
  const [instructors, set_instructors] = useState([])
  const [modify_course_department, set_modify_course_department] = useState('')

  /**
   * The Function "update_instructor_table()" makes a request to the list endpoint on the instructors route.
   */                                                                                          
  function update_instructor_table(){
    fetch('/api/instructor/').then(response => response.json()).then(json => {set_instructors(json)
      if(json.length > 0){
        set_instructor_id(json[0].id)
      }})
  }
  // Use effect to request the instructor information while loading the web page.
  useEffect(()=>{
    update_instructor_table()
  }, [])

  /**
   * The Function "update_instructor()" updates the name of the instructor selected, updates the
   * course department of the instructor selected, and automatically refreshes the instructor table.
   */      
  function update_instructor(){
    let update_instructor = instructors.find(instructor => instructor.id===instructor_id)
    // Send an update request to the "instructor_id" endpoint in instructors.
    fetch(`/api/instructor/${instructor_id}`,{
      method: 'PATCH',
      body: JSON.stringify({
        name: update_instructor.name,
        // Set the course department to the modified course department. 
        course_department: modify_course_department
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(() => update_instructor_table()) // Request and update the instructor table.
  }

  /**
   * The Function "create_and_add_instructor()" creates a new instructor with the listed name and
   * course department.
   */
  function create_and_add_instructor(){
    fetch('/api/instructor/',{
      method: 'POST',
      body: JSON.stringify(new_instructor),
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(() => window.location.reload()) // Reload the window when complete.
  }

  /**
   * The Function "delete_instructor()" deletes the instructor that has been selected.
   */
  function delete_instructor(){
    fetch(`/api/instructor/${instructor_id}`,{
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
    <div className="InstructorApp">
      <header className="InstructorApp-header">
        <img src={logo} className="InstructorApp-logo" alt="logo" />
        <p>
          Instructor Table
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
                course_department
              </th>
            </tr>
          </thead>
          <tbody>
            {instructors.map(instructor=><tr><td>{instructor.id}</td><td>{instructor.name}</td><td>{instructor.course_department}</td></tr>)}
          </tbody>
        </table>
        <label>
          instructor: <select value={instructor_id} onChange={(event)=>set_instructor_id(parseInt(event.target.value))}>
            {instructors.map(instructor=> <option value={instructor.id}>{instructor.name}</option>)}
          </select>
        </label>
        <label>
          course department: <input type="text" value={modify_course_department} onChange={(event)=>set_modify_course_department(event.target.value)}/>
        </label>
        <button onClick={update_instructor}>Update Course Department</button>
        <hr/>
        <label>
          name: <input value={new_instructor.name} onChange={(event)=>set_new_instructor({name:event.target.value,course_department:new_instructor.course_department})}/>
        </label>
        <label>
          course department: <input type="text" value={new_instructor.course_department} onChange={(event)=>set_new_instructor({name:new_instructor.name,course_department:event.target.value})}/>
        </label>
        <button onClick={create_and_add_instructor}>Add Instructor</button> 
        <hr/>
        <label>
          instructor: <select value={instructor_id} onChange={(event)=>set_instructor_id(parseInt(event.target.value))}>
            {instructors.map(instructor=> <option value={instructor.id}>{instructor.name}</option>)}
          </select>
        </label>
        <button onClick={delete_instructor}>Delete Instructor</button>
      </header>
    </div>
  );
}

// Export the primary function for use in another module.
export default InstructorApp;
