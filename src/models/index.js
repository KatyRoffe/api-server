'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const CatModel = require('./cats.js');
const BookModel = require('./books.js');

console.log(process.env.NODE_ENV);

let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';


const options = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
  : {};

let sequelizeInstance = new Sequelize('sqlite:memory');

const catTable = CatModel(sequelizeInstance, DataTypes);
const bookTable = BookModel(sequelizeInstance, DataTypes);

module.exports = {
  db: sequelizeInstance,
  cat: catTable,
  book: bookTable,
};