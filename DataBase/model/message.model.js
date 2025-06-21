import mongoose from "mongoose";

let messageSchema = mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    receivedId:mongoose.SchemaTypes.ObjectId
})

export let messageModel = mongoose.model("message",messageSchema) 