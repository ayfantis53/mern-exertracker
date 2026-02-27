// project imports
import Exercise from '../models/exercise.model.js';


/* @DESC   get all existing exercises ---------------------------------------------------------------------
*  @ROUTE  GET /exercises/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const getExercises = (req, res) => {
    Exercise.find()
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json('Error: ' + err));
};

/* @DESC   find an exercise -------------------------------------------------------------------------------
*  @ROUTE  GET /exercises/:id/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const findExercise = (req, res) => {
    Exercise.findById(req.params.id)
            .then(exercise => res.json(exercise))
            .catch(err => res.status(400).json('Error: ' + err));
};

/* @DESC   Create a new exercise --------------------------------------------------------------------------
*  @ROUTE  POST /exercises/add/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const addExercises = (req, res) => {
    const username    = req.body.username;
    const description = req.body.description;
    const duration    = Number(req.body.duration);
    const date        = Date.parse(req.body.date);

    const newExercise = new Exercise({ username, description, duration, date });

    newExercise.save()
               .then(() => res.json('Exercise Added!'))
               .catch(err => res.status(400).json('Error: ' + err));
};

/* @DESC   update an exercise -----------------------------------------------------------------------------
*  @ROUTE  PUT /exercises/update/:id/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const updateExercise = (req, res) => {
    Exercise.findById(req.params.id).then(exercise => {
        exercise.username    = req.body.username;
        exercise.description = req.body.description;
        exercise.duration    = Number(req.body.duration);
        exercise.date        = Date.parse(req.body.date);

        exercise.save()
                .then(() => res.json('Exercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

/* @DESC   delete an exercise -----------------------------------------------------------------------------
*  @ROUTE  DELETE /exercises/:id/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const deleteExercise = (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('Exercise Deleted!'))
            .catch(err => res.status(400).json('Error: ' + err));
};
