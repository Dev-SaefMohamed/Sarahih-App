import {userModel} from "../../../DataBase/model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import {sendEmail} from "../../../src/emails/Email.nodeMailer.js"
import Joi from "joi";

const signUp =async (req,res)=>{
    // validation 
    let schemaSignUp = Joi.object({
        name:Joi.string()
                .min(3)
                .max(6)
                .required(),
        email:Joi.string()
                 .email({ tlds: { allow: ['com', 'net'] } })
                 .required(),
        password:Joi.string()
                    .pattern(/^[A-Z][a-z0-9]{3,30}$/)
                    .required(),
        rePassword:Joi.ref("password"),
        age:Joi.number()
               .integer()
               .min(18)
               .max(100)
               .required()
    })
   let {error} = schemaSignUp.validate(req.body,{abortEarly:false})
   if (!error) {
     let { name, email, password, age } = req.body;
     //=> user can't sign up with the same email
     let user = await userModel.findOne({ email });
     if (!user) {
       sendEmail({ email });
       //hash password
       let hash = bcrypt.hashSync(password, 3);
       userModel.insertMany({ name, email, password: hash, age });
     } else {
       res.json({ message: "this email is already exists" });
     }
   }
   else{
      res.json({message: error})
   }
}

const signIn = async(req,res) => {
    let schemaSignIn = Joi.object({
        email:Joi.string()
                 .email({ tlds: { allow: ['com', 'net'] } })
                 .required(),
        password:Joi.string()
                    .pattern(/^[A-Z][a-z0-9]{3,30}$/)
                    .required()
    })
   let {error} = schemaSignIn.validate(req.body,{abortEarly:false})
   if(!error) {
     let { email, password } = req.body;
     let user = await userModel.findOne({ email });
     if (user) {
       //check the password
       //return the hash password to the regular password to make it done to sign in
       let match = bcrypt.compareSync(password, user.password);
       if (match) {
         //we need token here
         let token = jwt.sign({ UserId: user.id, name: user.name }, "done");
         res.json({ message: "welcome", token });
       } else {
         res.json({ message: "invalid password" });
       }
     } else {
       res.json({ message: "email not found" });
     }
   } 
   else{
    res.json({message: error})
   } 
}

export{
    signUp,
    signIn
}