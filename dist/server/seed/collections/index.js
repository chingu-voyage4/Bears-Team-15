'use strict';

var fs = require('fs');
var pattern = /\.json$/;
var collections = [];

fs.readdirSync(__dirname).filter(function (file) {
  return file !== 'index.js' && pattern.test(file);
}).forEach(function (file) {
  return collections.push(require('./' + file));
});

module.exports = collections;