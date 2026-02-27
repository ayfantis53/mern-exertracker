// npm installs
import mongoose from "mongoose";


/** -------------------------------------------------------------------------------------------
 *  All Exercises schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function.
const newSchema = mongoose.Schema;

// create a new schema object.
const exerciseSchema = newSchema({
    username:    { type: String, required: true },
    description: { type: String, required: true },
    duration:    { type: Number, required: true },
    date:        { type: Date,   required: true },
}, {
    timestamps: true,
});

// create a model using schema definition.
const Exercise = mongoose.model('Exercise', exerciseSchema);


// Default exports used because we are exporting a single primary Object from this module.
export default Exercise;