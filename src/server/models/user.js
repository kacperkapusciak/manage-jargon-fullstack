const mongoose = require('mongoose');
const Ajv = require('ajv');

const ajv = new Ajv();
require('ajv-async')(ajv);

const userSchema = {
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
};

// TODO: generating jwt

const User = mongoose.model('User', new mongoose.Schema(userSchema));

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
