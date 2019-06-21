const express = require('express');
const Jargon = require('../models/jargon');

const router = express.Router();

router.get('/', async (req, res) => {
  const jargonTerms = await Jargon.find().sort('name');
  res.send(jargonTerms);
});

module.exports = router;
