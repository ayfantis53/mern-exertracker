// npm installs
import mongoose from "mongoose";


/** -------------------------------------------------------------------------------------------
 *  All Users schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function.
const newSchema = mongoose.Schema;

// create a new schema object.
const userSchema = newSchema({
    username: {
        type:       String,
        required:   true,
        unique:     true,
        trim:       true,
        minlength:  3,
    },
}, {
    timestamps: true,
});

// create a model using schema definition.
const User = mongoose.model('User', userSchema);


// Default exports used because we are exporting a single primary Object from this module.
export default User;