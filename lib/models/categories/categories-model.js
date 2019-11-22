'use strict';

const Model = require('../model.js');
const schema = require('./categories-schema.js');

/**
 * Categories class extends the Model class
 * @constructor
 * @param  {object} schema
 */
class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
