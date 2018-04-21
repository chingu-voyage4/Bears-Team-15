'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _middleware = require('../middleware');

var _errMessages = require('../errMessages');

var _errMessages2 = _interopRequireDefault(_errMessages);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var router = express.Router();

_dotenv2.default.config();
var JWT_SECRET = process.env.JWT_SECRET;

router.get('/', function (req, res) {
  res.status(200).sendFile(path.resolve(__dirname, '../../index.html'));
});

var _require = require('../models'),
    User = _require.User,
    Collection = _require.Collection,
    Card = _require.Card;

router.post('/register', function (req, res) {
  var _req$body = req.body,
      login = _req$body.login,
      password = _req$body.password;

  User.create({ login: login, password: password }).then(function (user) {
    var newToken = _jsonwebtoken2.default.sign({
      _id: user._id.toString()
    }, JWT_SECRET, { expiresIn: '30d' });

    res.status(200).set('authorization', 'Bearer ' + newToken).send(user);
  }).catch(function (err) {
    var statusCode = 400;
    var msg = _errMessages2.default.registration.common;
    if (err.code == 11000) {
      msg = _errMessages2.default.registration.duplicate;
    } else if (err.errors) {
      var e = err.errors;
      if (e.login) {
        if (e.login.kind === 'required') {
          msg = _errMessages2.default.registration.emptyLogin;
        } else if (e.login.kind === 'invalidLogin') {
          msg = _errMessages2.default.registration.invalidLogin;
        }
      } else if (e.password) {
        if (e.password.kind === 'required') {
          msg = _errMessages2.default.registration.emptyPwd;
        } else if (e.password.kind === 'invalidPwd') {
          msg = _errMessages2.default.registration.invalidPwd;
        }
      }
    } else {
      console.error(err);
      statusCode = 500;
    }
    res.status(statusCode).send(msg);
  });
});

router.post('/login', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body2, login, password, msg, statusCode, authHeader, user, token, decoded, newToken;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body2 = req.body, login = _req$body2.login, password = _req$body2.password;
            msg = '';
            statusCode = 403;
            _context.prev = 3;
            authHeader = req.headers['authorization'];
            user = void 0;

            if (authHeader) {
              _context.next = 14;
              break;
            }

            if (!(!login || !password)) {
              _context.next = 9;
              break;
            }

            throw 'empty';

          case 9:
            _context.next = 11;
            return User.findByCredentials(login, password);

          case 11:
            user = _context.sent;
            _context.next = 21;
            break;

          case 14:
            token = authHeader.split(' ')[1];
            decoded = _jsonwebtoken2.default.verify(token, JWT_SECRET);

            if (decoded) {
              _context.next = 18;
              break;
            }

            throw 'invalidToken';

          case 18:
            _context.next = 20;
            return User.findById(decoded._id);

          case 20:
            user = _context.sent;

          case 21:
            if (user) {
              _context.next = 23;
              break;
            }

            throw 'notFound';

          case 23:
            newToken = _jsonwebtoken2.default.sign({
              _id: user._id.toString()
            }, JWT_SECRET, { expiresIn: '30d' });


            res.status(200).set('authorization', 'Bearer ' + newToken).send(user);
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](3);

            if (_context.t0 === 'empty') {
              msg = _errMessages2.default.login.common;
            } else if (_context.t0 === 'wrong' || _context.t0 === 'notFound') {
              msg = _errMessages2.default.login.wrongCredentials;
            } else if (_context.t0 === 'invalidToken') {
              msg = _errMessages2.default.login.invalidToken;
            } else {
              console.error(_context.t0);
              msg = _errMessages2.default.worstScenario;
              statusCode = 500;
            }
            res.status(statusCode).send(msg);

          case 31:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 27]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var handleSearch = function handleSearch(err, res, statusCode, msg, type, crud) {
  if (err === 'notFound') {
    statusCode = 404;
    msg = _errMessages2.default[type].notFound;
  } else if (err.kind === 'ObjectId') {
    statusCode = 400;
    msg = _errMessages2.default[type].badRequest;
  } else {
    statusCode = 500;
    msg = _errMessages2.default[type].common(crud);
    console.error(err);
  }
  res.status(statusCode).send(msg);
};

router.post('/collection/create', _middleware.authenticated, function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, collectionName, items, statusCode, msg, itemsId, collection, collections;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, collectionName = _req$body3.collectionName, items = _req$body3.items;
            statusCode = 400;
            msg = _errMessages2.default.collection.badRequest;
            _context3.prev = 3;

            if (!(!collectionName || !items || !(typeof collectionName === 'undefined' ? 'undefined' : _typeof(collectionName)) === String || !Array.isArray(items))) {
              _context3.next = 6;
              break;
            }

            throw 'bad';

          case 6:
            _context3.next = 8;
            return Promise.all(items.map(function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(item) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return Card.create(item);

                      case 2:
                        return _context2.abrupt('return', _context2.sent);

                      case 3:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 8:
            itemsId = _context3.sent;
            _context3.next = 11;
            return Collection.create({
              collectionName: collectionName,
              items: itemsId,
              shared: true
            });

          case 11:
            collection = _context3.sent;
            collections = req.user.collections;

            collections.push(collection._id);
            _context3.next = 16;
            return User.findByIdAndUpdate(req.user._id, { collections: collections });

          case 16:
            res.status(200).send({ _id: collection._id });
            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3['catch'](3);

            if (_context3.t0 !== 'bad') {
              statusCode = 500;
              msg = _errMessages2.default.collection.common('create');
              console.error(_context3.t0);
            }
            res.status(statusCode).send(msg);

          case 23:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 19]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.get('/collection/fork/:id', _middleware.authenticated, function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
    var id, statusCode, msg, original, collectionName, items, itemsId, clone, collections, thisIsOfCurrentUser;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            statusCode = 404;
            msg = _errMessages2.default.collection.common('read');
            _context5.prev = 3;
            _context5.next = 6;
            return Collection.findById(id).populate('items');

          case 6:
            original = _context5.sent;

            if (original) {
              _context5.next = 9;
              break;
            }

            throw 'notFound';

          case 9:
            collectionName = original.collectionName;
            items = original.items.map(function (_ref5) {
              var _doc = _ref5._doc;

              var _id = _doc._id,
                  __v = _doc.__v,
                  item = _objectWithoutProperties(_doc, ['_id', '__v']);

              return item;
            });
            _context5.next = 13;
            return Promise.all(items.map(function () {
              var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(item) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return Card.create(item);

                      case 2:
                        return _context4.abrupt('return', _context4.sent);

                      case 3:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x8) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 13:
            itemsId = _context5.sent;
            _context5.next = 16;
            return Collection.create({
              collectionName: collectionName,
              items: itemsId,
              shared: false
            });

          case 16:
            clone = _context5.sent;
            collections = req.user.collections;
            thisIsOfCurrentUser = !!collections.find(function (x) {
              return x.toString() === id.toString();
            });

            if (!thisIsOfCurrentUser) {
              _context5.next = 21;
              break;
            }

            return _context5.abrupt('return', res.status(400).send(_errMessages2.default.collection.forkingSelf));

          case 21:
            collections.push(clone._id);
            _context5.next = 24;
            return User.findByIdAndUpdate(req.user._id, { collections: collections });

          case 24:
            res.status(200).send(clone);
            _context5.next = 30;
            break;

          case 27:
            _context5.prev = 27;
            _context5.t0 = _context5['catch'](3);

            handleSearch(_context5.t0, res, statusCode, msg, 'collection', 'read');

          case 30:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[3, 27]]);
  }));

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}());

router.get('/collections/public', function (req, res) {
  var statusCode = 404;
  var msg = _errMessages2.default.noPublicFound;
  Collection.find({ shared: true }).populate('items').then(function (collections) {
    if (collections.length == 0) return Promise.reject('notFound');
    var toSend = [];
    collections.forEach(function (_ref7) {
      var _id = _ref7._id,
          collectionName = _ref7.collectionName,
          shared = _ref7.shared,
          items = _ref7.items;

      var cards = [];
      items.forEach(function (_ref8) {
        var _id = _ref8._id,
            q = _ref8.q,
            a = _ref8.a;

        cards.push({ _id: _id, q: q, a: a });
      });
      toSend.push({ _id: _id, collectionName: collectionName, shared: shared, items: cards });
    });
    res.status(200).send({ collections: toSend });
  }).catch(function (err) {
    if (err !== 'notFound') {
      statusCode = 500;
      msg = _errMessages2.default.worstScenario;
      console.error(err);
    }
    res.status(statusCode).send(msg);
  });
});

router.get('/collections/my', _middleware.authenticated, function (req, res) {
  var statusCode = 404;
  var msg = _errMessages2.default.noPrivateFound;
  User.findById(req.user._id).populate({
    path: 'collections',
    populate: { path: 'items' }
  }).then(function (_ref9) {
    var collections = _ref9.collections;

    if (collections.length == 0) return Promise.reject('notFound');
    var toSend = [];
    collections.forEach(function (_ref10) {
      var _id = _ref10._id,
          collectionName = _ref10.collectionName,
          shared = _ref10.shared,
          items = _ref10.items;

      var cards = [];
      items.forEach(function (_ref11) {
        var _id = _ref11._id,
            q = _ref11.q,
            a = _ref11.a;

        cards.push({ _id: _id, q: q, a: a });
      });
      toSend.push({ _id: _id, collectionName: collectionName, shared: shared, items: cards });
    });
    res.status(200).send({ collections: toSend });
  }).catch(function (err) {
    if (err !== 'notFound') {
      statusCode = 500;
      msg = _errMessages2.default.worstScenario;
      console.error(err);
    }
    res.status(statusCode).send(msg);
  });
});

router.put('/collection/:id', _middleware.authenticated, function () {
  var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(req, res) {
    var statusCode, msg, id, _req$body4, collectionName, shared, items, collection, del, mod, add, toDel, toMod, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref13, index, _id2, body, doc, shift, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ref14, _index, _id3, saved;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            statusCode = 200;
            msg = _errMessages2.default.worstScenario;
            id = req.params.id;
            _req$body4 = req.body, collectionName = _req$body4.collectionName, shared = _req$body4.shared, items = _req$body4.items;
            _context7.prev = 4;
            _context7.next = 7;
            return Collection.findById(id).populate('items');

          case 7:
            collection = _context7.sent;

            if (collection) {
              _context7.next = 10;
              break;
            }

            throw 'notFound';

          case 10:
            if (req.user.collections.find(function (x) {
              return x.toString() === id.toString();
            })) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt('return', res.status(403).send(_errMessages2.default.notAuthorized));

          case 12:

            if (collectionName) {
              collection.collectionName = collectionName;
            }
            if (shared !== undefined) {
              collection.shared = shared;
            }

            if (!items) {
              _context7.next = 81;
              break;
            }

            del = items.del, mod = items.mod, add = items.add;
            toDel = [];
            toMod = [];


            collection.items.forEach(function (card, index) {
              var id = card._id.toString();

              if (del && del.length > 0) {
                var i = del.findIndex(function (x) {
                  return x === id;
                });
                if (i !== -1) {
                  toDel.push({ index: index, id: id });
                  del.splice(i, 1);
                  return;
                }
              }

              if (mod && mod.length > 0) {
                var _i = mod.findIndex(function (x) {
                  return x._id === id;
                });
                if (_i !== -1) {
                  var _mod$_i = mod[_i],
                      _id = _mod$_i._id,
                      body = _objectWithoutProperties(_mod$_i, ['_id']);

                  toMod.push({ index: index, id: id, body: body });
                  mod.splice(_i, 1);
                }
              }
            });

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context7.prev = 22;
            _iterator = toMod[Symbol.iterator]();

          case 24:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context7.next = 34;
              break;
            }

            _ref13 = _step.value;
            index = _ref13.index, _id2 = _ref13.id, body = _ref13.body;
            _context7.next = 29;
            return Card.findByIdAndUpdate(_id2, body, { new: true });

          case 29:
            doc = _context7.sent;

            collection.items.splice(index, 1, doc);

          case 31:
            _iteratorNormalCompletion = true;
            _context7.next = 24;
            break;

          case 34:
            _context7.next = 40;
            break;

          case 36:
            _context7.prev = 36;
            _context7.t0 = _context7['catch'](22);
            _didIteratorError = true;
            _iteratorError = _context7.t0;

          case 40:
            _context7.prev = 40;
            _context7.prev = 41;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 43:
            _context7.prev = 43;

            if (!_didIteratorError) {
              _context7.next = 46;
              break;
            }

            throw _iteratorError;

          case 46:
            return _context7.finish(43);

          case 47:
            return _context7.finish(40);

          case 48:
            shift = 0;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context7.prev = 52;
            _iterator2 = toDel[Symbol.iterator]();

          case 54:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context7.next = 64;
              break;
            }

            _ref14 = _step2.value;
            _index = _ref14.index, _id3 = _ref14.id;
            _context7.next = 59;
            return Card.findByIdAndRemove(_id3);

          case 59:
            collection.items.splice(_index - shift, 1);
            shift += 1;

          case 61:
            _iteratorNormalCompletion2 = true;
            _context7.next = 54;
            break;

          case 64:
            _context7.next = 70;
            break;

          case 66:
            _context7.prev = 66;
            _context7.t1 = _context7['catch'](52);
            _didIteratorError2 = true;
            _iteratorError2 = _context7.t1;

          case 70:
            _context7.prev = 70;
            _context7.prev = 71;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 73:
            _context7.prev = 73;

            if (!_didIteratorError2) {
              _context7.next = 76;
              break;
            }

            throw _iteratorError2;

          case 76:
            return _context7.finish(73);

          case 77:
            return _context7.finish(70);

          case 78:
            if (!(add && add.length > 0)) {
              _context7.next = 81;
              break;
            }

            _context7.next = 81;
            return Promise.all(add.map(function () {
              var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(card) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.t0 = collection.items;
                        _context6.next = 3;
                        return Card.create(card);

                      case 3:
                        _context6.t1 = _context6.sent;
                        return _context6.abrupt('return', _context6.t0.push.call(_context6.t0, _context6.t1));

                      case 5:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x11) {
                return _ref15.apply(this, arguments);
              };
            }()));

          case 81:
            _context7.next = 83;
            return collection.save();

          case 83:
            saved = _context7.sent;


            res.status(200).send(saved);
            _context7.next = 90;
            break;

          case 87:
            _context7.prev = 87;
            _context7.t2 = _context7['catch'](4);

            handleSearch(_context7.t2, res, statusCode, msg, 'collection', 'update');

          case 90:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[4, 87], [22, 36, 40, 48], [41,, 43, 47], [52, 66, 70, 78], [71,, 73, 77]]);
  }));

  return function (_x9, _x10) {
    return _ref12.apply(this, arguments);
  };
}());

router.delete('/collection/:id', _middleware.authenticated, function () {
  var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(req, res) {
    var statusCode, msg, id, collection, deletedCards, deletedCollection;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            statusCode = 200;
            msg = _errMessages2.default.worstScenario;
            id = req.params.id;
            _context8.prev = 3;
            _context8.next = 6;
            return Collection.findById(id);

          case 6:
            collection = _context8.sent;

            if (collection) {
              _context8.next = 9;
              break;
            }

            throw 'notFound';

          case 9:
            if (req.user.collections.find(function (x) {
              return x.toString() === id.toString();
            })) {
              _context8.next = 11;
              break;
            }

            return _context8.abrupt('return', res.status(403).send(_errMessages2.default.notAuthorized));

          case 11:
            _context8.next = 13;
            return Promise.all(collection.items.map(function (cardId) {
              return Card.findByIdAndRemove(cardId).then(function (deletedCard) {
                return Promise.resolve(deletedCard._id);
              });
            }));

          case 13:
            deletedCards = _context8.sent;

            if (!(deletedCards.length !== collection.items.length)) {
              _context8.next = 16;
              break;
            }

            throw 'undeleted cards';

          case 16:
            _context8.next = 18;
            return collection.remove();

          case 18:
            deletedCollection = _context8.sent;

            if (!(deletedCollection._id.toString !== collection._id.toString)) {
              _context8.next = 21;
              break;
            }

            throw 'undeleted collection';

          case 21:
            res.status(200).send({ _id: deletedCollection._id });
            _context8.next = 27;
            break;

          case 24:
            _context8.prev = 24;
            _context8.t0 = _context8['catch'](3);

            handleSearch(_context8.t0, res, statusCode, msg, 'collection', 'destroy');

          case 27:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[3, 24]]);
  }));

  return function (_x12, _x13) {
    return _ref16.apply(this, arguments);
  };
}());

router.get('/card/:id', function (req, res) {
  var id = req.params.id;

  var statusCode = 404;
  var msg = _errMessages2.default.card.common('read');

  Card.findById(id).then(function (doc) {
    if (!doc) throw 'notFound';
    res.status(200).send(doc);
  }).catch(function (err) {
    return handleSearch(err, res, statusCode, msg, 'card', 'read');
  });
});

router.get('*', function (req, res) {
  res.status(404).send('Not found');
});

module.exports = router;
