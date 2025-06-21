import mongoose from 'mongoose';

export function DbConnection(){
    // to connect with DB
    mongoose.connect('mongodb://127.0.0.1:27017/HonestMessage-App')
    // first step in error handling
   .then(() => console.log('DB Connected!'))
   .catch((error) => console.log(error))
}