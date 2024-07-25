import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import cardRouter from './routes/cardRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cardsRouter from './routes/cardsRoute.js'
import statementRouter from './routes/statementRoute.js'
import paymentRouter from './routes/paymentRoute.js'


// app config
const app = express()
const port = 4000



// middleware
app.use(express.json())
app.use(cors())


// DB connection
connectDB();



// api endpoint
app.use('/api/user', userRouter)
app.use('/api/card', cardRouter)
app.use('/api/statement', statementRouter)
app.use('/api/payment' , paymentRouter)

// app.use('/api/cards', cardsRouter)




app.get('/', (req, res) => {
    res.send("API Working")
})


app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://p021097:<password>@cluster0.ccl9bjc.mongodb.net/?