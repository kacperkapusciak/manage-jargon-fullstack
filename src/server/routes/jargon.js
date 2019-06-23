const express = require('express');
const { Jargon, validate } = require('../models/jargon');

const router = express.Router();

router.get('/', async (req, res) => {
  const jargonTerms = await Jargon.find().sort('name');
  return res.send(jargonTerms);
});

router.post('/', async (req, res) => {
  const valid = await validate(req.body);
  if (!valid) return res.status(400).send('Invalid name or description.');

  const jargonTerm = new Jargon({
    name: req.body.name,
    description: req.body.description
  });
  await jargonTerm.save();
  return res.send(jargonTerm);
});

module.exports = router;
