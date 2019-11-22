'use strict';

const Model = require('../model.js');
const schema = require('./todo-schema.js');


/**
 * Todo class extends the Model class
 * @constructor
 * @param  {object} schema
 */

class Todo extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Todo;
