// npm installs
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

// project imports
import * as Comp from './components/__index';   


/** ----------------------------------------------------------------------------------------
* 
* @returns Main Component of web app
* ----------------------------------------------------------------------------------------*/
function App() {

  // html page.
  return (
    <Router>
      <div className="container">
        <Comp.Navbar/>
        <br />
          <Routes>
              <Route path='/'         element={ <Comp.ExercisesList/>  }/>
              <Route path='/edit/:id' element={ <Comp.EditExercise/>   }/>
              <Route path='/create'   element={ <Comp.CreateExercise/> }/>
              <Route path='/user'     element={ <Comp.CreateUser/>     }/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
