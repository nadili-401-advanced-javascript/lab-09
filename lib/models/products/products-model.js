'use strict';

const Model = require('../model.js');
const schema = require('./products-schema.js');

/**
 * Products class extends the Model class
 * @constructor
 * @param  {object} schema
 */

class Products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Products;
