'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.status(200).sendFile(path.resolve(__dirname, '../../index.html'));
});

var _require = require('../models'),
    Collection = _require.Collection,
    Card = _require.Card;

router.get('/collection', function (req, res) {
  res.status(200).send('Collection API route');
});

router.get('/collections/public', function (req, res) {
  Collection.find({ shared: true }).populate('items').then(function (collections) {
    var toSend = [];
    collections.forEach(function (_ref) {
      var _id = _ref._id,
          collectionName = _ref.collectionName,
          shared = _ref.shared,
          items = _ref.items;

      var cards = [];
      items.forEach(function (_ref2) {
        var _id = _ref2._id,
            q = _ref2.q,
            a = _ref2.a;

        cards.push({ _id: _id, q: q, a: a });
      });
      toSend.push({ id: _id, collectionName: collectionName, shared: shared, items: cards });
    });
    res.status(200).send({ collections: toSend });
  }).catch(function (err) {
    return res.status(404).send('Not found');
  });
});

router.get('*', function (req, res) {
  res.status(404).send('Not found');
});

module.exports = router;