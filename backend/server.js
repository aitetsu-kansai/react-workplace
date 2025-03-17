import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import groupRoutes from './routes/groupRoutes.js'
import noteRoutes from './routes/noteRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/notes', noteRoutes)
app.use('/groups', groupRoutes)
app.use('/tasks', taskRoutes)

app.listen(process.env.PORT, () =>
	console.log(`Сервер запущен на порту ${process.env.PORT}`)
)
