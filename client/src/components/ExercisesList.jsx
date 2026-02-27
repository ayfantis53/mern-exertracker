// react imports
import { useState, useEffect } from 'react';

// npm installs
import axios from 'axios';


/** ----------------------------------------------------------------------------------------
 * 
 * @returns List of all entered exercises
 * ----------------------------------------------------------------------------------------*/
export default function ExercisesList() {

  // Hook to change state of html.
  const [exerciseList, setExerciseList] = useState([]);
  const [error,        setError       ] = useState(null);

  // On startup.
  useEffect(() => {
    const fetchData = async () =>
    {
      try {
        const response = await axios.get(`/api/exercises`)
        setExerciseList(response.data);
      } catch (err) {
        setError(err);
      }
    }
    
    fetchData();
  }, []); 

  if (error) {
    return (<p> Error: {error.message} </p>)
  }

  // Delete an exercise from backend.
  const deleteExercise = (id) => {
    axios.delete(`/api/exercises/${ id }`).then(response => { console.log(response.data) });
    console.log('DELETED');
  };

  // html page.
  return (
    <div data-testid='dashboard-display'>
      {/* TITLE OF PAGE */}
      <h3 className='shadow p-3 mb-3 bg-white rounded'> All Exercises Posted </h3>
      {/* EXERCISE TABLE */}
      <table className="table shadow-sm p-3 mb-5 bg-white rounded">
          {/* TABLE HEADERS */}
          <thead className='thead-light'>
              <tr>
                  <th> Username </th>
                  <th> Description </th>
                  <th> Duration </th>
                  <th> Date </th>
                  <th> Actions </th>
              </tr>
          </thead>
          {/* TABLE DATA BODY */}
          <tbody>
            {exerciseList.map((exercise) => {
              return(
                <tr key = { exercise._id }>
                    <td>{ exercise.username }</td>
                    <td>{ exercise.description }</td>
                    <td>{ exercise.duration }</td>
                    <td>{ exercise.date.substring(0,10) }</td>
                    <td>
                      <a className="btn btn btn-outline-warning" href={'/edit/'+ exercise._id} role="button">Edit</a> | &nbsp;
                      <a className="btn btn-outline-danger" href="/" role="button" onClick={ () => { deleteExercise(exercise._id) } }> Delete </a>
                        
                    </td>
                </tr>
              );
            })}
          </tbody>
      </table>
    </div>
  );
};