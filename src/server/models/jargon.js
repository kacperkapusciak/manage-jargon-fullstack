const mongoose = require('mongoose');

const jargonSchema = {
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  description: {
    type: String,
    required: true,
    max: 255
  }
};

const Jargon = mongoose.model('Jargon', new mongoose.Schema(jargonSchema));

module.exports = Jargon;
