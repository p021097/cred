import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placePayment, verifyPayment, updateRemainingAmount } from '../controllers/paymentCotroller.js'


const paymentRouter = express.Router()

paymentRouter.post('/payment',authMiddleware,placePayment)
paymentRouter.post('/verify', verifyPayment)
// paymentRouter.post('/update-remaining-amount', authMiddleware, updateRemainingAmount)



export default paymentRouter