const express = require('express');
const { Jargon, validate } = require('../models/jargon');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
  const jargonTerms = await Jargon.find().sort('name');
  return res.send(jargonTerms);
});

router.get('/tabs', auth, async (req, res) => {
  const jargonTerms = await Jargon.find().sort('name');
  const names = jargonTerms.map(term => term.name);
  const firstLetters = names.map(name => name.charAt(0).toUpperCase());
  const countCharacters = {};
  firstLetters.forEach((letter) => {
    if (Number.isNaN(parseInt(letter, 10)) && !countCharacters.hasOwnProperty(letter)) {
      countCharacters[letter] = 1;
    } else if (Number.isNaN(parseInt(letter, 10))) {
      countCharacters[letter]++;
    }
  });

  const tabs = {};
  tabs['123...'] = jargonTerms.filter(term => !Number.isNaN(parseInt(term.name.charAt(0), 10)));

  for (let i = 0; i < Object.keys(countCharacters).length - 2; i++) {
    const [letter, value] = Object.entries(countCharacters)[i];
    if (value >= 20) {
      tabs[letter] = jargonTerms.filter(term => term.name.charAt(0) === letter);
    } else {
      const [nextLetter, nextValue] = Object.entries(countCharacters)[i + 1];
      const [nextNextLetter, nextNextValue] = Object.entries(countCharacters)[i + 2];
      if (nextValue < 20 && nextNextValue < 20) {
        tabs[`${letter}-${nextNextLetter}`] = [
          ...jargonTerms.filter(term => term.name.charAt(0) === letter),
          ...jargonTerms.filter(term => term.name.charAt(0) === nextLetter),
          ...jargonTerms.filter(term => term.name.charAt(0) === nextNextLetter)
        ];
        i += 2;
      } else if (nextNextValue >= 20) {
        tabs[`${letter}-${nextLetter}`] = [
          ...jargonTerms.filter(term => term.name.charAt(0) === letter),
          ...jargonTerms.filter(term => term.name.charAt(0) === nextLetter),
        ];
        i++;
      } else {
        tabs[letter] = jargonTerms.filter(term => term.name.charAt(0) === letter);
      }
    }
  }

  return res.send(tabs);
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
