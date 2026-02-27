// project imports
import User from '../models/user.model.js';


/* @DESC   get all existing Users -------------------------------------------------------------------------
*  @ROUTE  GET /users/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const getUsers = (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
};

/* @DESC   Create a new user ------------------------------------------------------------------------------
*  @ROUTE  POST /users/add/
*  @ACCESS private  
*---------------------------------------------------------------------------------------------------------*/
export const addUsers = (req, res) => {
    const username = req.body.username;
    const newUser  = new User({ username });

    newUser.save()
           .then(() => res.json('User Added!'))
           .catch(err => res.status(400).json('Error: ' + err))
};