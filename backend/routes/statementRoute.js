import express from 'express'
import { listTransactions } from '../controllers/statementController.js'
import authMiddleware from '../middleware/auth.js'


const statementRouter = express.Router()

statementRouter.get('/transactions', authMiddleware, listTransactions)





export default statementRouter