const express = require('express')
const router = express.Router()

import errors from '../errMessages'

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../index.html'))
})

const { User, Collection, Card } = require('../models')

// USER routes: --------------------------------------------------------

router.post('/register', (req, res) => {
  const { login, password } = req.body
  User.create({ login, password })
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => {
      let statusCode = 400
      let msg = errors.registration.common
      if (err.code == 11000) {
        msg = errors.registration.duplicate
      } else if (err.errors) {
        const e = err.errors
        if (e.login && e.login.kind === 'required') {
          msg = errors.registration.empty.login
        } else if (e.password && e.password.kind === 'required') {
          msg = errors.registration.empty.password
        }
      } else {
        console.error(err)
        statusCode = 500
      }
      res.status(statusCode).send(msg)
    })
})

router.post('/login', async (req, res) => {
  const { login, password } = req.body
  let msg = ''
  let statusCode = 403
  try {
    if (!login || !password) throw 'empty'
    const user = await User.findByCredentials(login, password)
    res.status(200).send(user)
  } catch (err) {
    if (err === 'empty') {
      msg = errors.login.common
    } else if (err === 'wrong') {
      msg = errors.login.wrongCredentials
    } else {
      console.error(err)
      msg = errors.worstScenario
      statusCode = 500
    }
    res.status(statusCode).send(msg)
  }
})

// COLLECTION ROUTES: --------------------------------------------------
const handleSearch = (err, res, statusCode, msg, type, crud) => {
  if (err === 'notFound') {
    statusCode = 404
    msg = errors[type].notFound
  } else if (err.kind === 'ObjectId') {
    statusCode = 400
    msg = errors[type].badRequest
  } else {
    statusCode = 500
    msg = errors[type].common(crud)
    console.log(err)
  }
  res.status(statusCode).send(msg)
}

// CREATE collection
router.post('/collection/create', async (req, res) => {
  const { collectionName, items } = req.body
  let statusCode = 400
  let msg = errors.collection.badRequest

  try {
    if (!collectionName
      || !items
      || ! typeof collectionName === String
      || ! Array.isArray(items)
    ) throw 'bad'
    const itemsId = await Promise.all(
      items.map(async item => await Card.create(item))
    )
    const collection = await Collection.create({
      collectionName,
      items: itemsId,
    })
    res.status(200).send({ _id: collection._id })
  } catch (err) {
    if (err !== 'bad') {
      statusCode = 500
      msg = errors.collection.common('create')
      console.log(err)
    }
    res.status(statusCode).send(msg)
  }
})

// READ collection
router.get('/collection/:id', (req, res) => {
  const { id } = req.params
  let statusCode = 404
  let msg = errors.collection.common('read')

  Collection.findById(id)
    .populate('items')
    .then(doc => {
      if (!doc) throw 'notFound'
      res.status(200).send(doc)
    })
    .catch(err => handleSearch(err, res, statusCode, msg, 'collection', 'read'))
})

// INDEX public
router.get('/collections/public', (req, res) => {
  let statusCode = 404
  let msg = errors.noPublicFound
  Collection.find({ shared: true })
    .populate('items')
    .then(collections => {
      if (collections.length == 0) return Promise.reject('notFound')
      const toSend = []
      collections.forEach(({ _id, collectionName, shared, items }) => {
        const cards = []
        items.forEach(({ _id, q, a }) => {
          cards.push({ _id, q, a })
        })
        toSend.push({ id: _id, collectionName, shared, items: cards })
      })
      res.status(200).send({ collections: toSend })
    })
    .catch(err => {
      if (err !== 'notFound') {
        statusCode = 500
        msg = errors.worstScenario
        console.log(err)
      }
      res.status(statusCode).send(msg)
    })
})

// UPDATE collection
router.put('/collection/:id', async (req, res) => {
  let statusCode = 200
  let msg = errors.worstScenario
  const { id }  = req.params
  const { collectionName, shared } = req.body
  try {
    const collection = await Collection.findById(id)
    collection.collectionName = collectionName
    collection.shared = shared
    const toSend = await collection.save()
    res.status(200).send(toSend)
  } catch (err) {
    handleSearch(err, res, statusCode, msg, 'collection', 'update')
  }
})

// DESTROY collection
router.delete('/collection/:id', async (req, res) => {
  let statusCode = 200
  let msg = errors.worstScenario
  const { id }  = req.params
  try {
    const collection = await Collection.findById(id)
    if (!collection) throw 'notFound'
    const deletedCards = await Promise.all(
      collection.items.map(cardId =>
        Card.findByIdAndRemove(cardId)
          .then(deletedCard => Promise.resolve(deletedCard._id))
      )
    )
    if (deletedCards.length !== collection.items.length)
      throw 'undeleted cards'
    const deletedCollection = await collection.remove()
    if (deletedCollection._id.toString !== collection._id.toString)
      throw 'undeleted collection'
    res.status(200).send({ _id: deletedCollection._id })
  } catch (err) {
    handleSearch(err, res, statusCode, msg, 'collection', 'destroy')
  }
})

// CARD routes: --------------------------------------------------------

// CREATE card

// READ card
router.get('/card/:id', (req, res) => {
  const { id } = req.params
  let statusCode = 404
  let msg = errors.card.common('read')

  Card.findById(id)
    .then(doc => {
      if (!doc) throw 'notFound'
      res.status(200).send(doc)
    })
    .catch(err => handleSearch(err, res, statusCode, msg, 'card', 'read'))
})

// UPDATE card

// DESTROY card

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

module.exports = router
