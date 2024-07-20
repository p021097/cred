import express from 'express'
import { addCard, listCard, removeCard } from '../controllers/cardController.js'


const cardRouter = express.Router()

cardRouter.post('/add', addCard)
cardRouter.get('/list', listCard)
cardRouter.post('/remove', removeCard)








export default cardRouter