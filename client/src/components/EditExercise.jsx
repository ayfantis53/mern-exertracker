// react imports
import { useState, useEffect} from 'react';

// npm installs
import axios         from 'axios';
import DatePicker    from 'react-datepicker';
import { useParams } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns Form for editing existing Exercises, Loads all the existing data
 *           for selected exercise to be changed
 * ----------------------------------------------------------------------------------------*/
export default function EditExercise() {
  
  // Get param out of the url.
  const params = useParams();

  // Hook to change the state of the html.
  const [username,    setUsername   ] = useState('');
  const [description, setDescription] = useState('');
  const [duration,    setDuration   ] = useState(0);
  const [date,        setDate       ] = useState(new Date());
  const [users,       setUsers      ] = useState([]);

  // On startup hook.
  useEffect(() => {

    // Fetches all data from exercise chosen to edit.
    axios.get(`/api/exercises/${params.id}`)
         .then((response) => { 
            setUsername(response.data.username);
            setDescription(response.data.description);
            setDuration(response.data.duration);
            setDate(new Date(response.data.date));
        });
  }, [params.id]);

  // On startup hook.
  useEffect(() => {
    // Fetches all users to populate the dropdown menu.
    axios.get(`/api/users`).then((response) => { setUsers(response.data) });
  }, []);

  // Edit exercise in database.
  const onSubmit = (event) => {
    event.preventDefault();
    // Data from form to be sent to backend.
    const editExercise = { username:    username, 
                           description: description, 
                           duration:    duration, 
                           date:        date };
    // Debug.
    console.log(editExercise); 
    
    axios.put(`/api/exercises/update/${params.id}`, editExercise);
    
    // Alert user request was sent.
    window.location ='/';
    alert('Exercise Edited');
  };

  // html page.
  return (
    <div>
      {/* TITLE OF PAGE */}
        <h3 className='shadow p-3 mb-3 bg-white rounded'> Create New Exercise Log </h3>
        {/* USER FORM TO POST NEW EXERCISES */}
        <form onSubmit={onSubmit} className='shadow-sm p-3 mb-5 bg-white rounded border border-secondary'>
            {/* USER SELECT DROP DOWN BOX */}
            <div className="form-group mb-4">
                <label htmlFor="username-input"> Username: </label>
                <select id="username-input" className='form-control form-text' value={ username } onChange={ (event)=>{ setUsername(event.target.value) } } required>
                  {
                    users.map((user) => { return(<option key={user.username} value={user.username}>{user.username}</option>); })
                  }
                </select>
                {/* DESCRIPTION INPUT */}
                <div className="form-group mb-4">
                    <label htmlFor="description-input"> Description </label>
                    <input id="description-input" type="text" className='form-control form-text' value={ description } onChange={ (event)=>{ setDescription(event.target.value) } } required/>
                </div>
                {/* DURATION INPUT */}
                <div className="form-group mb-4">
                    <label htmlFor="duration-input"> Duration (in minutes): </label>
                    <input id="duration-input" type="number" className='form-control form-text' value={ duration } onChange={ (event)=>{ setDuration(event.target.value) } } required/>
                </div>
                {/* DATE-PICKER DROP DOWN */}
                <div className="form-group mb-5">
                    <label htmlFor="date-input"> Date: </label>
                    <div><DatePicker id="date-input" selected={ date } onChange={(date)=>{setDate(date)}}/></div>
                </div>
                {/* FORM SUBMIT BUTTON */}
                <div className="form-group mb-3">
                    <input type="submit" className='btn btn-primary shadow p-2' value='Edit Exercise Log'/>
                </div>
            </div>
        </form>
    </div>
  );
};