import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    card : {
        type : Object,
        // required : true
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now()
    },
    payment : {
        type : Boolean,
        default : false
    }
})

const paymentModel = mongoose.models.payment || mongoose.model("payment",paymentSchema)

export default paymentModel