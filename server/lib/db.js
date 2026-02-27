// npm installs
import mongoose from 'mongoose';


/**
 * Connects us to our Mongo Atlas Database and if it fails, it tells us why
 * @return void
 */
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.ATLAS_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}