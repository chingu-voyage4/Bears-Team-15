'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticated = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _errMessages = require('../errMessages');

var _errMessages2 = _interopRequireDefault(_errMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('regenerator-runtime/runtime');

_dotenv2.default.config();
var JWT_SECRET = process.env.JWT_SECRET;

var _require = require('../models'),
    User = _require.User;

var authenticated = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
    var msg, authHeader, token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msg = _errMessages2.default.notAuthorized;
            _context.prev = 1;
            authHeader = req.header('authorization');

            if (authHeader) {
              _context.next = 5;
              break;
            }

            throw 'invalidToken';

          case 5:
            token = authHeader.split(' ')[1];

            if (token) {
              _context.next = 8;
              break;
            }

            throw 'invalidToken';

          case 8:
            decoded = _jsonwebtoken2.default.verify(token, JWT_SECRET);

            if (decoded) {
              _context.next = 11;
              break;
            }

            throw 'invalidToken';

          case 11:
            _context.next = 13;
            return User.findById(decoded._id);

          case 13:
            user = _context.sent;

            if (user) {
              _context.next = 16;
              break;
            }

            throw 'notAuthorized';

          case 16:
            req.user = user;
            next();
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](1);

            if (_context.t0 === 'invalidToken') msg = _errMessages2.default.login.invalidToken;
            res.status(403).send(msg);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 20]]);
  }));

  return function authenticated(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.authenticated = authenticated;