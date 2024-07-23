import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placePayment } from '../controllers/paymentCotroller.js'


const paymentRouter = express.Router()

paymentRouter.post('/payment',authMiddleware,placePayment)



export default paymentRouter