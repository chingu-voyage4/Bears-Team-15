const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

const {Collection} = require('../models')

router.get('/collection', (req, res) => {
  res.status(200).send('Collection API route')
})

router.get('/collections/public', (req, res) => {
  res.status(200).send({
    collections: [
      {
        collectionName: 'Italian words',
        id: 'remote1',
        items: [
          {q: 'ciotola', a: 'bowl'},
          {q: 'tazza', a: 'cup'},
          {q: 'forchetta', a: 'fork'},
          {q: 'piatto', a: 'plate'},
          {q: 'scrivania', a: 'desk'},
          {q: 'tavola', a: 'table'},
          {q: 'matita', a: 'pencil'},
          {q: 'penna', a: 'pen'},
          {q: 'quaderno', a: 'exercise book'},
          {q: 'diario', a: 'diary'},
        ]
      },
      {
        collectionName: 'European Capital Cities',
        id: 'remote2',
        items: [
          {q: 'England', a: 'London'},
          {q: 'France', a: 'Paris'},
          {q: 'Germany', a: 'Berlin'},
          {q: 'Spain', a: 'Madrid'},
          {q: 'Italy', a: 'Rome'},
          {q: 'Scotland', a: 'Edinburgh'},
          {q: 'Wales', a: 'Cardiff'},
          {q: 'Northern Ireland', a: 'Belfast'},
          {q: 'Portugal', a: 'Lisbon'},
          {q: 'Greece', a: 'Athens'},
          {q: 'Austria', a: 'Vienna'},
          {q: 'Switzerland', a: 'Bern'},
          {q: 'Belgium', a: 'Brussels'},
          {q: 'Ireland', a: 'Dublin'},
          {q: 'Netherlands', a: 'Amsterdam'},
          {q: 'Denmark', a: 'Copenhagen'},
          {q: 'Poland', a: 'Warsaw'},
          {q: 'Russia', a: 'Moscow'},
          {q: 'Ukraine', a: 'Kyiv'},
          {q: 'Norway', a: 'Oslo'},
          {q: 'Sweden', a: 'Stockholm'},
          {q: 'Turkey', a: 'Ankara'},
          {q: 'Cyprus', a: 'Nicosia'},
          {q: 'Bulgaria', a: 'Sofia'},
          {q: 'Romania', a: 'Bucharest'},
          {q: 'Iceland', a: 'Reykjavík'},
          {q: 'Luxembourg', a: 'Luxembourg City'},
        ]
      }
    ],
  })
})

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

module.exports = router
