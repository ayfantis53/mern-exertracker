// npm installs
import express from 'express';

// project imports
import { getExercises, 
         findExercise, 
         addExercises, 
         updateExercise, 
         deleteExercise } from '../controllers/exercise.controllers.js';


/** -------------------------------------------------------------------------------------------
 *  All routes for Exercises
 ** ----------------------------------------------------------------------------------------- */

// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// READ routes.
router.get('/',           getExercises);
router.get('/:id',        findExercise);

// CREATE routes.
router.post('/add',       addExercises);

// UPDATE routes.
router.put('/update/:id', updateExercise);

// DELETE routes.
router.delete('/:id',     deleteExercise);


// Default export because we are exporting a single primary variable from this module.
export default router;