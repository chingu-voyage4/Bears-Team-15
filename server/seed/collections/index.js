const fs = require('fs')
const pattern = /\.json$/
const collections = []

fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js' && pattern.test(file))
  .forEach(file => collections.push(require('./' + file)))

module.exports = collections
