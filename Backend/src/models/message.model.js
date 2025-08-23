import mongoose from "mongoose";

// Message Schema
const messageScheme = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    text: {
        type: String,
    },
    image: {
        type: String
    },
}, {timestamps: true});

// Message model(collection)
const Message = mongoose.model("Message", messageScheme);

export default Message;