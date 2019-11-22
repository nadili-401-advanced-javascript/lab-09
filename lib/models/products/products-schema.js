'use strict';

const mongoose = require('mongoose');

// The schema for the products class
const products = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

// Creating a data model products
module.exports = mongoose.model('products', products);
