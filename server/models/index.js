const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({

})

module.exports = {
  Collection: mongoose.model('Collection', CollectionSchema),
}
