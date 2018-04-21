'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var collections = require('./collections');

var _require = require('../models'),
    User = _require.User,
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
            return User.remove({});

          case 3:
            _context.next = 5;
            return Collection.remove({});

          case 5:
            _context.next = 7;
            return Card.remove({});

          case 7:
            return _context.abrupt('return', Promise.resolve());

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);
            return _context.abrupt('return', Promise.reject(_context.t0));

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function resetAllCollections() {
    return _ref.apply(this, arguments);
  };
}();

var populateCollections = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Promise.all(collections.map(function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(x) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return populateCollection(x);

                      case 2:
                        return _context2.abrupt('return', _context2.sent);

                      case 3:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 3:
            return _context3.abrupt('return', Promise.resolve());

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](0);

            console.error(_context3.t0);
            return _context3.abrupt('return', Promise.reject(_context3.t0));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 6]]);
  }));

  return function populateCollections() {
    return _ref2.apply(this, arguments);
  };
}();

var populateCollection = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref5) {
    var collectionName = _ref5.collectionName,
        shared = _ref5.shared,
        items = _ref5.items;
    var savedItems, saved;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return populateCards(items);

          case 3:
            savedItems = _context4.sent;
            _context4.next = 6;
            return Collection({
              collectionName: collectionName,
              shared: shared,
              items: savedItems
            }).save();

          case 6:
            saved = _context4.sent;
            return _context4.abrupt('return', Promise.resolve(saved));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](0);

            console.error(_context4.t0);
            return _context4.abrupt('return', Promise.reject(_context4.t0));

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 10]]);
  }));

  return function populateCollection(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var populateCards = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(deck) {
    var itemsId;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return Promise.all(deck.map(function () {
              var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(item) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return Card.create(item);

                      case 2:
                        return _context5.abrupt('return', _context5.sent);

                      case 3:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x4) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 3:
            itemsId = _context6.sent;
            return _context6.abrupt('return', Promise.resolve(itemsId));

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6['catch'](0);

            console.error(_context6.t0);
            return _context6.abrupt('return', Promise.reject(_context6.t0));

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function populateCards(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

var seed = function () {
  var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log('seed DB');
            _context7.prev = 1;
            _context7.next = 4;
            return resetAllCollections();

          case 4:
            _context7.next = 6;
            return populateCollections();

          case 6:
            console.log('Success: Seeding done');
            process.exit(0);
            _context7.next = 15;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7['catch'](1);

            console.log('Error: Failed to seed');
            console.error(_context7.t0);
            process.exit(1);

          case 15:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 10]]);
  }));

  return function seed() {
    return _ref8.apply(this, arguments);
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