import express from 'express'
import { cardAddedByUser, cardRemovedByUser, getCards } from '../controllers/userCardsController.js'
import authMiddleware from '../middleware/auth.js'

const cardsRouter = express.Router()

cardsRouter.post("/add", authMiddleware, cardAddedByUser)
cardsRouter.post("/remove", authMiddleware, cardRemovedByUser)
cardsRouter.get('/get', authMiddleware, getCards)

export default cardsRouter