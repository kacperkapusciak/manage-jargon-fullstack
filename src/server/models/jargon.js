const mongoose = require('mongoose');
// const data = require('../../../data/jargon');

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
  }
};

const Jargon = mongoose.model('Jargon', new mongoose.Schema(jargonSchema));

module.exports = Jargon;
