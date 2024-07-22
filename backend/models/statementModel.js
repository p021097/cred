import mongoose from "mongoose";

const statementSchema = new mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    vendor : {
        type:String,
        required:true
    },
    type : {
        type:String,
        required:true
    },
    category : {
        type:String,
        required:true
    },
    amount : {
        type:Number,
        required:true
    },
    card : {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'card',
      required: true,
    }
      
})

const statementModel = mongoose.models.statement || mongoose.model("statement",statementSchema)

export default statementModel