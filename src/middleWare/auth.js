import jwt from "jsonwebtoken"

export const auth = (req,res,next) => {
    let token = req.header("token");
    jwt.verify(token,"done",(error,decoded)=>{
        if(error){
            res.json({message:"error",error})
        }
        else{
            req.take = decoded.UserId
            
            next();
        }
    })   
}