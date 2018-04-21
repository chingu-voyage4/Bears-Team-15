'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('../mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _modules = require('./modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
(0, _mongoose2.default)(process.env.MONGODB_URI);
(0, _modules.seed)();