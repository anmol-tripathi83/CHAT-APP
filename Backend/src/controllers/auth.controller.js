import { generateToken } from "../lib/utills.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res)=>{
    const {fullName, email, password} = req.body;
    try{
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are reuired"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 character long"});
        }
        const user = await User.findOne({email});
        // if user already exist
        if(user) return res.status(400).json({message: "Email already exists"});
        
        // hash the password
        const salt = await bcrypt.genSalt(10);   // generally 10
        const hashPassword = await bcrypt.hash(password, salt);

        // creating the user
        const newUser = new User({        // user got created
            fullName,        // as it is same as its it is hence can leave it
            email,
            password: hashPassword
        });

        // generating the token to send it to the frontend
        if(newUser){
            // generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();    // user is saved in the databases

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic : newUser.profilePic,
            });
        } else{
            res.status(400).json({message: "Invalid user data"});
        }
    } catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}


export const login = async (req, res)=>{

}


export const logout = (req, res)=>{

}


export const updateProfile = async (req, res) => {

}


export const checkAuth = (req, res) => {
    
}