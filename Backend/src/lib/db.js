import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        const connec = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${connec.connection.host}`);
    } catch(error){
        console.log("MongoDB connection error", error);
    }
};