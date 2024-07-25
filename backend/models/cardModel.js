import mongoose from 'mongoose'
import {card_transactions} from "../utils/utils.js"

const cardSchema = new mongoose.Schema({
    cardNumber : {
        type :  Number,
        required : true,
        validate: {
            validator: function(v) {
              return /^\d{16}$/.test(v);
            },
            message: props => `${props.value} is not a valid card number! It must be exactly 16 digits.`
          },
          maxlength: [16, 'Card number must be exactly 16 digits']
    },
    expiryDate: {
        type: String,
        required: [true, 'Expiry date is required'],
        validate: {
          validator: function(v) {
            return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
          },
          message: props => `${props.value} is not a valid expiry date! It must be in the format MM/YY.`
        }
      },
    nameOnTheCard : {
        type : String,
        required : true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
  },
  statementData : [{ 
    type: Array, 
    default : [] }],
    remainingAmount: {
      type: Number,
      default: 0
    }
},{minimize:false})


cardSchema.pre('save', function(next) {
  if (this.isNew && (!this.statementData || !this.statementData.length)) {
    this.statementData = card_transactions;
  }
  next();
});

const cardModel = mongoose.models.card || mongoose.model("card", cardSchema)

export default cardModel

