const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const jargon = require('./routes/jargon');
const users = require('./routes/users');
const auth = require('./routes/auth');

mongoose
  .connect('mongodb://localhost/manage-jargon', {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB...'));

if (!config.get('jwtPrivateKey')) {
  throw new Error('Fatal error: jwtPrivateKey is not defined.');
}

const app = express();
app.use(express.json());

app.use('/api/jargon/', jargon);
app.use('/api/users/', users);
app.use('/api/auth/', auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
