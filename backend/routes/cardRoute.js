import express from 'express'
import { addCard, listCard, removeCard, updateRemainingAmount, getCardDetails } from '../controllers/cardController.js'
import authMiddleware from '../middleware/auth.js'


const cardRouter = express.Router()

cardRouter.post('/add', authMiddleware, addCard)
cardRouter.get('/list',authMiddleware, listCard)
cardRouter.get('/card', authMiddleware, getCardDetails)
cardRouter.post('/remove',authMiddleware, removeCard)
cardRouter.post('/update-remaining-amount', authMiddleware, updateRemainingAmount)









export default cardRouter