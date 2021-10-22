'use strict';

const express = require('express');

const { cat } = require('../models/index.js');
const router = express.Router();


router.get('/', getAllCats);
router.get('/:id', getOneCat);
router.post('/', createCats);
router.put('/:id', updateCats);
router.delete('/:id', removeCats);

async function getAllCats(req, res) {
  const allcats = await cat.findAll();
  res.status(200).send(allcats);
}

async function getOneCat(req,res) {
  const id = req.params.id;
  const oneCat = await cat.findbyPk(parseInt(id));
  res.status(200).send(oneCat);
}

async function createCats(req, res) {
  const newCat = await cat.create({
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
  })
  res.status(200).send(newCat);
}

async function updateCats(req, res) {
  const id = req.params.id;
  const catToUpdate = await cat.findByPk(parseInt(id));
  const updatedCat = await catToUpdate.update({
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
  });
  res.status(200).send(updatedCat)
}

async function removeCats(req, res) {
  const id = req.params.id;
  await cat.destroy(id);
  res.status(204).send('Success');
}

module.exports = router;