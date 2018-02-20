const express = require('express'),
  app = express(),
  {NODE_ENV} = process.env

// application-level middleware:
const bodyParser = require('body-parser')
app.use(bodyParser.json())
if (NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors({exposedHeaders: ['x-auth']}))
  require('dotenv').config()
}

const {PORT, MONGODB_URI} = process.env

// connect to database:
// require('./mongoose')(MONGODB_URI)

// routes:
const routes = require('./routes')
app.use('/', routes)

// fire application:
app.listen(PORT, () => console.log(`Your app is running in ${NODE_ENV} mode`))
