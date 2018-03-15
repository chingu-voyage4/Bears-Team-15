const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../index.html'))
})

const { Collection, Card } = require('../models')

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
