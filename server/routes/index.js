const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

const {Collection} = require('../models')

router.get('/collection', (req, res) => {
  res.status(200).send('Collection API route')
})

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

module.exports = router
