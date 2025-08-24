import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

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
    try {
        const {id: userToChatId} = req.params;    // id for the user to which message we want
        const myId = req.user._id;     // user currently want to see his conversation with his friend

        const messages = await Message.find({      // filter: it will fetch all the message bw both of us 
            $or: [
                {senderId: myId, recieverId: userToChatId},
                {senderId: userToChatId, recieverId: myId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}


// Function to send the messages to the friend
export const sendMessage = async (req, res) =>{
    try {
        const {text, image} = req.body;
        const {id : receiverId} = req.params;     // getting id from params renaming it to be more readable
        const senderId = req.user._id;

        let imageUrl;
        if(image){    // if image in the message
            // upload base64 image to the cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // realtime functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {      // if user is online then send the msg in realtime
            // unicast to receiver
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in send Message controller: ", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}