require('dotenv').config()

require('../mongoose')(process.env.MONGODB_URI)

console.log('seed DB')
