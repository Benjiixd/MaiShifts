import express from 'express'
import { connectToDatabase } from './config/mongoose.js'
import dotenv from 'dotenv'
import { router } from './routes/router.js'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())

// Configure CORS to allow all origins for development
app.use(cors({
  origin: '*', // You can specify the frontend URL here for production
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/', router)

const server = app.listen(3020, async () => {
  try {
    await connectToDatabase(process.env.DB_CONNECTION_STRING)
  } catch (err) {
    console.error(err)
  }
  console.log(`Server running on port ${server.address().port}`)
})
