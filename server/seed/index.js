require('dotenv').config()

require('../mongoose')(process.env.MONGODB_URI)

require('./modules').seed()
