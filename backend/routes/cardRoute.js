import express from 'express'
import { addCard, listCard, removeCard } from '../controllers/cardController.js'
import authMiddleware from '../middleware/auth.js'


const cardRouter = express.Router()

cardRouter.post('/add', authMiddleware, addCard)
cardRouter.get('/list',authMiddleware, listCard)
cardRouter.post('/remove',authMiddleware, removeCard)








export default cardRouter