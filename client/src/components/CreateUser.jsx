// react imports
import { useState } from 'react';

// npm installs
import axios from 'axios';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Form for creating users to add to database
 * ----------------------------------------------------------------------------------------*/
export default function CreateUser() {

  // Hook to change element state of html.
  const [username, setUsername] = useState('');

  // Add new User to Database.
  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = { username: username };
    // Debug.
    console.log(newUser); 
    
    axios.post(`/api/users/add`, newUser); 
    
    // Alert user request was sent.
    window.location ='/user';
    alert('User Created');
  };

  // html page.
  return (
    <div data-testid='createUser-display'>
      {/* TITLE OF PAGE */}
      <h3 className='shadow p-3 mb-3 bg-white rounded'> Create New User </h3>
      {/* USER FORM TO POST NEW USER */}
      <form onSubmit={onSubmit} className='shadow-sm p-3 mb-5 bg-white rounded border border-secondary' data-testid='user-form'>
          {/* USER SELECT DROP DOWN BOX */}
          <div className="form-group mb-4">
              {/* USER-CREATE INPUT */}
              <div className="form-group mb-4">
                  <label htmlFor="username-input"> Username: </label>
                  <input id="username-input" type="text" className='form-control form-text' placeholder='Username...' onChange={ (event)=>{ setUsername(event.target.value) } } required/>
              </div>
              {/* FORM SUBMIT BUTTON */}
              <div className="form-group mb-3">
                  <input type="submit" className='btn btn-primary shadow p-2' value='Create New User'/>
              </div>
            </div>
        </form>
    </div>
  );
};