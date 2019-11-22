'use strict';

const mongoose = require('mongoose');

// schema for the categories class
const categories = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// Virtual -- doesn't actually exist in schema
// References todo database
categories.virtual('tasks', {
  ref: 'todo',
  localField: 'name',
  foreignField: 'category',
  justOne: false,
});

/**
 * Return todos tasks associated with given category
 * @returns  {object} tasks
 * @returns error
 */
const populateTasks = function() {
  try {
    this.populate('tasks');
  } catch (e) {
    console.error('Find Error', e);
  }
};

// Calling populateTasks BEFORE Mongoose requests the find endpoint
categories.pre('find', populateTasks);

// Creating a data model categories
module.exports = mongoose.model('categories', categories);
