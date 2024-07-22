import mongoose from 'mongoose'
import cardModel from './cardModel.js'


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    cardData : [{ type: mongoose.Schema.Types.ObjectId, ref: 'card' }]
},{minimize:false})


const userModel = mongoose.models.user || mongoose.model("user" , userSchema)

export default userModel