// react imports
import { useState, useEffect} from 'react';

// npm installs
import axios      from 'axios'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "react-datepicker/dist/react-datepicker.css";


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Form for creating exercises to add to database
 * ----------------------------------------------------------------------------------------*/
export default function CreateExercise() {

  // State management.
  const [username,    setUsername   ] = useState('');
  const [description, setDescription] = useState('');
  const [duration,    setDuration   ] = useState(0);
  const [date,        setDate       ] = useState(new Date());
  const [users,       setUsers      ] = useState([]);

  // On Startup.
  useEffect(() => {
    // Fetches all users to populate the dropdown menu.
    axios.get(`/api/users`)
         .then((response) => { setUsers(response.data) });
  }, []);

  // Add new Exercise to Database.
  const onSubmit = (event) => {
    event.preventDefault();
    // Data from form to be sent to backend.
    const newExercise = { username:    username, 
                          description: description, 
                          duration:    duration, 
                          date:        date };
    // Debug.
    console.log(newExercise); 
    
    axios.post(`/api/exercises/add`, newExercise);
    setUsers([setUsers,  newExercise]);
    
    // Alert user request was sent.
    window.location ='/';
    alert('Exercise Created');
  };

  // html page.
  return (
    <div data-testid='createExercise-display'>
      {/* TITLE OF PAGE */}
        <h3 className='shadow p-3 mb-3 bg-white rounded'> Create New Exercise Log </h3>
        {/* USER FORM TO POST NEW EXERCISES */}
        <form onSubmit={onSubmit} className='shadow-sm p-3 mb-5 bg-white rounded border border-secondary' data-testid='exercise-form'>
            {/* USER SELECT DROP DOWN BOX */}
            <div className="form-group mb-4">
                <label htmlFor="username-input"> Username: </label>
                <select id="username-input" className='form-control form-text' defaultValue={'DEFAULT'} onChange={ (event)=>{ setUsername(event.target.value) } } required>
                  <option value="DEFAULT" disabled>Choose a User ...</option>
                  {
                    users.map((user) => { return(<option key={user.username} value={user.username}> {user.username} </option>);})
                  }
                </select>
                {/* DESCRIPTION INPUT */}
                <div className="form-group mb-4">
                    <label htmlFor="description-input"> Description </label>
                    <input id="description-input" type="text" className='form-control form-text' placeholder='Description...' onChange={ (event)=>{ setDescription(event.target.value) } } required/>
                </div>
                {/* DURATION INPUT */}
                <div className="form-group mb-4">
                    <label htmlFor="duration-input"> Duration (in minutes): </label>
                    <input id="duration-input" type="number" className='form-control form-text' placeholder={duration} onChange={ (event)=>{ setDuration(event.target.value) } } required/>
                </div>
                {/* DATE-PICKER DROP DOWN */}
                <div className="form-group mb-5">
                    <label htmlFor="date-input"> Date: </label>
                    <div><DatePicker id="date-input" selected={date} onChange={(date)=>{setDate(date)}} /></div>
                </div>
                {/* FORM SUBMIT BUTTON */}
                <div className="form-group mb-3">
                    <input type="submit" className='btn btn-primary shadow p-2' value='Create Exercise Log'/>
                </div>
            </div>
        </form>
    </div>
  );
};