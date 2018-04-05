const mongoose = require('mongoose')
import bcrypt from 'bcryptjs'

const getByteLength = input =>
  input.split('')
    .map(char => char.charCodeAt(0))
    .map(c =>
      c < (1 <<  7) ? 1 :
      c < (1 << 11) ? 2 :
      c < (1 << 16) ? 3 :
      c < (1 << 21) ? 4 :
      c < (1 << 26) ? 5 : Number.NaN
    )
    .reduce((sum, bytes) => sum + bytes)

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: x => /^[\w\-\.@]+$/.test(x),
      type: 'invalidLogin'
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: x => {
        const s = String(x)
        const l = s.length
        if (l < 8 || l > 72) return false
        const bytes = getByteLength(s)
        return !!bytes && bytes <= 72
      },
      type: 'invalidPwd',
    },
  },
  collections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  }],
})

UserSchema.methods.toJSON = function () {
  const { login, _id, collections } = this
  return { login, _id, collections }
}

UserSchema.pre('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err
        user.password = hash
        next()
      })
    })
  }
})

UserSchema.statics.findByCredentials = function (login, password) {
  const User = this
  return User.findOne({ login })
    .then(user => {
      if (!user) {
        return Promise.reject('wrong')
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
          .then (res => {
            res ? resolve(user) : reject('wrong')
          })
      })
    })
}

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

CollectionSchema.methods.toJSON = function () {
  const { collectionName, shared, items, _id } = this
  return { collectionName, shared, items, _id }
}

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

CardSchema.methods.toJSON = function () {
  const { q, a, _id } = this
  return { q, a, _id }
}

module.exports = {
  User: mongoose.model('User', UserSchema),
  Collection: mongoose.model('Collection', CollectionSchema),
  Card: mongoose.model('Card', CardSchema),
}
