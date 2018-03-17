const express = require('express')
const router = express.Router()

import errors from '../errMessages'

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../index.html'))
})

const { User, Collection, Card } = require('../models')

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

router.get('/collection', (req, res) => {
  res.status(200).send('Collection API route')
})

router.get('/collections/public', (req, res) => {
  Collection.find({ shared: true })
    .populate('items')
    .then(collections => {
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
    .catch(err => res.status(404).send('Not found'))
})

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

module.exports = router
