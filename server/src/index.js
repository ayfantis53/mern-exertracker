// npm installs
import cors     from "cors";
import dotenv   from 'dotenv';
import express  from "express";

// project imports
import { connectDB }  from "../lib/db.js";
import userRoutes     from '../routes/user.routes.js';
import exerciseRoutes from '../routes/exercise.routes.js';


// returns an object of parsed .env file.
dotenv.config();

// inititalize express.
const app  = express();
// set port.
const port = process.env.PORT || 5000;

// middleware.
app.use(cors());
app.use(express.json());

// routes to databases.
app.use('/api/users',     userRoutes);
app.use('/api/exercises', exerciseRoutes);

// Connect to database and port.
app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
    connectDB();
});
