'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connect;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

function connect(dburl) {
  _mongoose2.default.connect(dburl).then(function () {
    return console.log('Connected to DB ' + dburl);
  }).catch(function () {
    return console.error('Error: unable to connect to DB');
  });
}