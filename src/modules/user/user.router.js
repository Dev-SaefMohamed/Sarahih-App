import express from "express";
import { signIn, signUp } from "./user.controller.js";

let userRouter = express.Router();

// register
userRouter.post("/signUp",signUp)
// sign in
userRouter.post("/signIn",signIn)


export default userRouter;