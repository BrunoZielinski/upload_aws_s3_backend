import 'dotenv/config'
import { resolve } from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { router } from './routes'

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(router)

// Cria uma rota estática
app.use('/uploads', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))

app.listen(process.env.SERVER_PORT || process.env.PORT, () =>
  console.log(
    '🚀 Server is running on port ' + process.env.SERVER_PORT ||
      process.env.PORT
  )
)
