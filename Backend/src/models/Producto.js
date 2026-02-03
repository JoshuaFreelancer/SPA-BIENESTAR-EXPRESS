const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  category: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  stock: {
    type: Number,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  img: {
    type: String,
    default: false
  }
});

module.exports = mongoose.model('Product', productSchema);