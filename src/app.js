import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import { db } from './config/mongoose_db'
import { router } from './routes/index'

dotenv.config()
db()
const PORT = process.env.PORT || 9000

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join('assets')))
app.use(express.json())

// start server
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})

// setup terminal logger
app.use(morgan('dev'))

app.use(router)
