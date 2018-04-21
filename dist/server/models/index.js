'use strict';

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');


var getByteLength = function getByteLength(input) {
  return input.split('').map(function (char) {
    return char.charCodeAt(0);
  }).map(function (c) {
    return c < 1 << 7 ? 1 : c < 1 << 11 ? 2 : c < 1 << 16 ? 3 : c < 1 << 21 ? 4 : c < 1 << 26 ? 5 : Number.NaN;
  }).reduce(function (sum, bytes) {
    return sum + bytes;
  });
};

var UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: function validator(x) {
        return (/^[\w\-\.@]+$/.test(x)
        );
      },
      type: 'invalidLogin'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function validator(x) {
        var s = String(x);
        var l = s.length;
        if (l < 8 || l > 72) return false;
        var bytes = getByteLength(s);
        return !!bytes && bytes <= 72;
      },
      type: 'invalidPwd'
    }
  },
  collections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  }]
});

UserSchema.methods.toJSON = function () {
  var login = this.login,
      _id = this._id,
      collections = this.collections;

  return { login: login, _id: _id, collections: collections };
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    _bcryptjs2.default.genSalt(10, function (err, salt) {
      _bcryptjs2.default.hash(user.password, salt, function (err, hash) {
        if (err) throw err;
        user.password = hash;
        next();
      });
    });
  }
});

UserSchema.statics.findByCredentials = function (login, password) {
  var User = this;
  return User.findOne({ login: login }).then(function (user) {
    if (!user) {
      return Promise.reject('wrong');
    }
    return new Promise(function (resolve, reject) {
      _bcryptjs2.default.compare(password, user.password).then(function (res) {
        res ? resolve(user) : reject('wrong');
      });
    });
  });
};

var CollectionSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: true,
    trim: true
  },
  shared: {
    type: Boolean,
    required: false
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }]
});

CollectionSchema.methods.toJSON = function () {
  var collectionName = this.collectionName,
      shared = this.shared,
      items = this.items,
      _id = this._id;

  return { collectionName: collectionName, shared: shared, items: items, _id: _id };
};

var CardSchema = new mongoose.Schema({
  q: {
    type: String,
    required: true,
    trim: true
  },
  a: {
    type: String,
    required: true,
    trim: true
  }
});

CardSchema.methods.toJSON = function () {
  var q = this.q,
      a = this.a,
      _id = this._id;

  return { q: q, a: a, _id: _id };
};

module.exports = {
  User: mongoose.model('User', UserSchema),
  Collection: mongoose.model('Collection', CollectionSchema),
  Card: mongoose.model('Card', CardSchema)
};