const express = require('express');
const { Jargon, validate } = require('../models/jargon');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const jargonTerms = await Jargon.find().sort('name');
  return res.send(jargonTerms);
});

router.post('/', [auth, admin], async (req, res) => {
  const valid = await validate(req.body);
  if (!valid) return res.status(400).send('Invalid name or description.');

  const jargonTerm = new Jargon({
    name: req.body.name,
    description: req.body.description
  });
  await jargonTerm.save();
  return res.send(jargonTerm);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const valid = await validate(req.body);
  if (!valid) return res.status(400).send('Invalid name or description.');

  const jargonTerm = await Jargon.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, description: req.body.description },
    { new: true }
  );

  if (!jargonTerm) return res.status(404).send('Jargon term not found!');
  return res.send(jargonTerm);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const jargonTerm = await Jargon.findByIdAndRemove(req.params.id);
  if (!jargonTerm) return res.status(404).send('Jargon term not found!');
  return res.send(jargonTerm);
});

router.get('/:id', auth, async (req, res) => {
  const jargonTerm = await Jargon.findById(req.params.id);
  if (!jargonTerm) return res.status(404).send('Jargon term not found!');
  return res.send(jargonTerm);
});

module.exports = router;
