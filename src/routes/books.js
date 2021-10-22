'use strict';

const express = require('express');

const { book } = require('../models/index.js');
const router = express.Router();


router.get('/', getAllBooks);
router.get('/:id', getOneBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', removeBooks);

async function getAllBooks(req, res) {
  const allBooks = await book.findAll();
  res.status(200).send(allBooks);
}

async function getOneBook(req,res) {
  const id = req.params.id;
  const oneBook = await book.findbyPk(parseInt(id));
  res.status(200).send(oneBook);
}

async function createBook(req, res) {
  const newBook = await book.create({
    title: req.body.title,
    description: req.body.description,
    stars: req.body.stars,
  })
  res.status(200).send(newBook);
}

async function updateBook(req, res) {
  const id = req.params.id;
  const bookToUpdate = await book.findByPk(parseInt(id));
  const updatedBook = await bookToUpdate.update({
    title: req.body.title,
    description: req.body.description,
    stars: req.body.stars,
  });
  res.status(200).send(updatedBook);
}

async function removeBooks(req, res) {
  const id = req.params.id;
  await book.destroy(id);
  res.status(204).send('Success');
}

module.exports = router;