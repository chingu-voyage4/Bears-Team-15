const mongoose = require('mongoose')
import bcrypt from 'bcryptjs'


const CollectionSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
    trim: true,
  },
  shared: {
    type: Boolean,
    required: false
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  }],
})

const CardSchema = new mongoose.Schema({
  q: {
    type: String,
    required: true,
    trim: true,
  },
  a: {
    type: String,
    required: true,
    trim: true,
  },
})

module.exports = {
  Collection: mongoose.model('Collection', CollectionSchema),
  Card: mongoose.model('Card', CardSchema),
}
