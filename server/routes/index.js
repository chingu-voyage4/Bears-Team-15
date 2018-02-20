const express = require('express'),
  router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Team Bears-15 is greeting you!')
})

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

module.exports = router
