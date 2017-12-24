const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = ({
  name: String,
  image: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computers', 'phones', 'accesories']},
  description: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);