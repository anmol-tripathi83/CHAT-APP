import User from "../models/user.model.js";

// Function to get All users to show in the sidebar except itself
export const getUsersForSidebar = async (req, res) =>{
    // here we have to fetch all users and used to show all of them in sidebar except itself(loggedInUser) 
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");  // id not equal to loggedInUserId and excpet it password

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserForSidebar controller: ", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}


// Function to fetch all messages bw loggedInUser and his friend
export const getMessages = async (req, res) =>{

}


// Function to send the messages to the friend
export const sendMessage = async (req, res) =>{

}