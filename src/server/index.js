const express = require('express');
const mongoose = require('mongoose');
const jargon = require('./routes/jargon');

mongoose
  .connect('mongodb://localhost/manage-jargon', {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connected to MongoDB...'));

const app = express();
app.use(express.json());

app.use('/api/jargon/', jargon);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
