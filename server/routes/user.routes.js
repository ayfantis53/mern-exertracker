// npm installs
import express from 'express';

// project imports
import { getUsers, addUsers } from '../controllers/user.controllers.js';


/** -------------------------------------------------------------------------------------------
 *  All routes for Users
 ** ----------------------------------------------------------------------------------------- */

// create a new router object which is an isolated instance of middleware and routing functions.
const router = express.Router();

// READ routes.
router.get('/',     getUsers);

// CREATE routes.
router.post('/add', addUsers);


// Default exports used because we are exporting a single primary variable from this module.
export default router;