import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) =>{
    try {
        // check user have token or not
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorize - No Token Provided"});
        }
        // if have token then decode it fetch the payload of it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If invalid token then cant get payload
        if(!decoded){
           return res.status(401).json({message: "Unauthorize - Invalid Token"}); 
        }

        // fetch the user using their _id and select its details except its password
        const user = await User.findById(decoded.userId).select("-password");    

        // If user is not found in DB
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        // If all going well
        req.user = user;    // sending becuase it is being used in updateProfile function
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}