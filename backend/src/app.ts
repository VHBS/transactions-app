import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import routes from './routes'
import ErrorMiddleware from './middlewares/error/ErrorMiddleware'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.get('/', (_req, res) => {
  return res.send('<h1>Aplicação rodando!</h1>')
})

app.get('/env', (_req, res) => {
  return res.json({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT
  })
})

const errorMiddleware = new ErrorMiddleware()
app.use(errorMiddleware.execute)

export default app
