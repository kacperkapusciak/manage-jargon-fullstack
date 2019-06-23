const mongoose = require('mongoose');
const Ajv = require('ajv');

const ajv = new Ajv();
require('ajv-async')(ajv);

const jargonSchema = {
  name: {
    type: String,
    required: true,
    min: 2,
    max: 128
  },
  description: {
    type: String,
    required: true,
  }
};

const Jargon = mongoose.model('Jargon', new mongoose.Schema(jargonSchema));

function validateJargon(jargonTerm) {
  const validationSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 128 },
      description: { type: 'string' }
    }
  };
  const validate = ajv.compile(validationSchema); // made asynchronous with 'ajv-async'
  return validate(jargonTerm); // returns a promise
}

exports.Jargon = Jargon;
exports.validate = validateJargon;
