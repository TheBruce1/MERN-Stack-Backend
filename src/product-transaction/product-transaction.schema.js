const { Schema } = require('mongoose');

const ProductTransactionSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  sold: Boolean,
  category: String
});

module.exports = { ProductTransactionSchema };
