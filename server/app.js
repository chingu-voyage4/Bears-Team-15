import express from 'express'
import path from 'path'
import routes from './routes'
import connect from './mongoose'
const app = express()

// configuration:
const NODE_ENV = process.env.NODE_ENV || 'development'
if (NODE_ENV !== 'production') require('dotenv').config()
const { PORT } = process.env
const MONGODB_URI = NODE_ENV === 'test'
  ? process.env.MONGODB_URI + '-test'
  : process.env.MONGODB_URI

// application-level middleware:
import bodyParser from 'body-parser'
app.use(bodyParser.json())
if (NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors({ exposedHeaders: ['x-auth'] }))
}

app.use(express.static(path.resolve(__dirname, '..')))
app.use('/', routes)


// fire application:
connect(MONGODB_URI)
const server = app.listen(PORT, () =>
  console.log(`Your app is running in ${NODE_ENV} mode`)
)

export {
  app,
  server,
}
