'use strict';

const express = require('express');
const catsRoutes = require('./routes/cats.js');
const booksRoutes = require('./routes/books.js');
const error404 = require('./error-handlers/404.js');
const error500 = require('./error-handlers/500.js');

const app = express();

app.use(express.json());


app.use('/cats', catsRoutes);
app.use('/books', booksRoutes);

app.use('*', error404);
app.use(error500);

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log('app is running'));
  } 
}