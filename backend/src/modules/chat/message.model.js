import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
    chatId: String,
    senderId: String,
    content: String
    },
    { timestamps: true } 
);

export const Message = mongoose.model("Message", messageSchema);