'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV !== 'production') require('dotenv').config();
var PORT = process.env.PORT;

var MONGODB_URI = NODE_ENV === 'test' ? process.env.MONGODB_URI + '-test' : process.env.MONGODB_URI;

app.use(_bodyParser2.default.json());

if (NODE_ENV !== 'production') {
  var cors = require('cors');
  app.use(cors({ exposedHeaders: ['authorization'] }));
}

app.use(_express2.default.static(_path2.default.resolve(__dirname, '..')));
app.use('/', _routes2.default);

(0, _mongoose2.default)(MONGODB_URI);
var server = app.listen(PORT, function () {
  return console.log('Your app is running in ' + NODE_ENV + ' mode');
});

exports.app = app;
exports.server = server;
