import express from 'express'
import path from 'path'
const app = express()
const NODE_ENV = process.env.NODE_ENV || 'development'

// application-level middleware:
import bodyParser from 'body-parser'
app.use(bodyParser.json())
if (NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors({ exposedHeaders: ['x-auth'] }))
  require('dotenv').config()
}

app.use(express.static(path.resolve(__dirname, '..')))

const {PORT, MONGODB_URI} = process.env

// connect to database:
import connect from './mongoose'
connect(MONGODB_URI)

// routes:
import routes from './routes'
app.use('/', routes)

// fire application:
app.listen(PORT, () => console.log(`Your app is running in ${NODE_ENV} mode`))

export default app
