'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var collections = require('./collections');

var _require = require('../models'),
    Collection = _require.Collection,
    Card = _require.Card;

var resetAllCollections = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Collection.remove({});

          case 3:
            return _context.abrupt('return', Promise.resolve());

          case 6:
            _context.prev = 6;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);
            return _context.abrupt('return', Promise.reject(_context.t0));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 6]]);
  }));

  return function resetAllCollections() {
    return _ref.apply(this, arguments);
  };
}();

var populateCollections = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, collection;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 4;
            _iterator = collections[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 13;
              break;
            }

            collection = _step.value;
            _context2.next = 10;
            return populateCollection(collection);

          case 10:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 13:
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 19:
            _context2.prev = 19;
            _context2.prev = 20;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 22:
            _context2.prev = 22;

            if (!_didIteratorError) {
              _context2.next = 25;
              break;
            }

            throw _iteratorError;

          case 25:
            return _context2.finish(22);

          case 26:
            return _context2.finish(19);

          case 27:
            return _context2.abrupt('return', Promise.resolve());

          case 30:
            _context2.prev = 30;
            _context2.t1 = _context2['catch'](0);

            console.error(_context2.t1);
            return _context2.abrupt('return', Promise.reject(_context2.t1));

          case 34:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 30], [4, 15, 19, 27], [20,, 22, 26]]);
  }));

  return function populateCollections() {
    return _ref2.apply(this, arguments);
  };
}();

var populateCollection = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref4) {
    var collectionName = _ref4.collectionName,
        shared = _ref4.shared,
        items = _ref4.items;
    var savedItems, saved;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return populateCards(items);

          case 3:
            savedItems = _context3.sent;
            _context3.next = 6;
            return Collection({
              collectionName: collectionName,
              shared: shared,
              items: savedItems
            }).save();

          case 6:
            saved = _context3.sent;
            return _context3.abrupt('return', Promise.resolve(saved));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](0);

            console.error(_context3.t0);
            return _context3.abrupt('return', Promise.reject(_context3.t0));

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 10]]);
  }));

  return function populateCollection(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var populateCards = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(deck) {
    var list, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, card, saved;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            list = [];
            _context4.prev = 1;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context4.prev = 5;
            _iterator2 = deck[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context4.next = 16;
              break;
            }

            card = _step2.value;
            _context4.next = 11;
            return Card(card).save();

          case 11:
            saved = _context4.sent;

            list.push(saved._id);

          case 13:
            _iteratorNormalCompletion2 = true;
            _context4.next = 7;
            break;

          case 16:
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4['catch'](5);
            _didIteratorError2 = true;
            _iteratorError2 = _context4.t0;

          case 22:
            _context4.prev = 22;
            _context4.prev = 23;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 25:
            _context4.prev = 25;

            if (!_didIteratorError2) {
              _context4.next = 28;
              break;
            }

            throw _iteratorError2;

          case 28:
            return _context4.finish(25);

          case 29:
            return _context4.finish(22);

          case 30:
            return _context4.abrupt('return', Promise.resolve(list));

          case 33:
            _context4.prev = 33;
            _context4.t1 = _context4['catch'](1);

            console.error(_context4.t1);
            return _context4.abrupt('return', Promise.reject(_context4.t1));

          case 37:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 33], [5, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function populateCards(_x2) {
    return _ref5.apply(this, arguments);
  };
}();

var seed = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('seed DB');
            _context5.prev = 1;
            _context5.next = 4;
            return resetAllCollections();

          case 4:
            _context5.next = 6;
            return populateCollections();

          case 6:
            console.log('Success: Seeding done');
            process.exit(0);
            _context5.next = 15;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](1);

            console.log('Error: Failed to seed');
            console.error(_context5.t0);
            process.exit(1);

          case 15:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 10]]);
  }));

  return function seed() {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = {
  collections: collections,
  seed: seed,
  resetAllCollections: resetAllCollections,
  populateCollections: populateCollections,
  populateCollection: populateCollection,
  populateCards: populateCards
};