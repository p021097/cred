import paymentModel from "../models/paymentModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// making payment from frontend

const placePayment = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const newPayment = new paymentModel({
            userId : req.userId,
            card : req.body.card,
            amount : req.body.amount,
            
        })

        await newPayment.save()

        const line_items = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: req.body.card.cardNumber,
                        
                    },
                    unit_amount: req.body.amount * 100, // Stripe requires amount in cents
                },
                quantity: req.body.quantity
            }
        ]
        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode : "payment",
            success_url : `${frontend_url}/payment?success=true&paymentId=${newPayment._id}`,
            cancel_url : `${frontend_url}/statement?success=false&paymentId=${newPayment._id}`,

        })
        res.json({success : true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error})
    }
}




export {placePayment}