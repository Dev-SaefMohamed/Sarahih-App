import express from "express";
import { postMessage, getUserMessage, getAllMessage } from "./message.controller.js";
import { auth } from "../../middleWare/auth.js";

let messageRouter = express.Router();
//send message
messageRouter.post("/message",postMessage);
//get user message
messageRouter.get("/getUserMessage",auth,getUserMessage)
//get all messages
//s
messageRouter.get("/messages",auth,getAllMessage)
export default messageRouter;