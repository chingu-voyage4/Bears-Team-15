const express = require('express'),
  router = express.Router()

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../dist/index.html'))
})

router.get('*', (req, res) => {
  res.status(404).send('Not found')
})

module.exports = router
