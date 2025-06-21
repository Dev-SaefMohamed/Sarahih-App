import { messageModel } from "../../../DataBase/model/message.model.js";

const postMessage = (req,res)=>{
   let{message , receivedId} = req.body
   messageModel.insertMany({message , receivedId})
   res.json({message:"success"})
}

const getUserMessage = async(req,res) => {
    console.log(req.take);
    let user = await messageModel.find({receivedId:req.take})
    res.json({message:"success",user})
}

const getAllMessage = async (req,res)=>{
            let user = await messageModel.find()
            res.json({message:"success",user})
}
export{
    postMessage,
    getUserMessage,
    getAllMessage
}