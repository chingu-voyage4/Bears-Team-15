const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = dburl => {
  mongoose.connect(dburl)
    .then(() => console.log(`Connected to DB ${dburl}`))
    .catch(() => console.error('Error: unable to connect to DB'))
}
