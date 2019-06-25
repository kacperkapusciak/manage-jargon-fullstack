const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Ajv = require('ajv');

const ajv = new Ajv();
require('ajv-async')(ajv);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 128
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 1024 // extra character space for encryption
  },
  admin: {
    type: Boolean
  }
});

// giving name to function expression aids debugging ↓
userSchema.methods.generateAuthToken = function token() {
  return jwt.sign({ _id: this._id, admin: this.admin }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const validationSchema = {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 4, maxLength: 128 },
      password: { type: 'string', minLength: 4, maxLength: 255 }
    }
  };
  const validate = ajv.compile(validationSchema);
  return validate(user); // returns a promise
}

exports.User = User;
exports.validate = validateUser;
