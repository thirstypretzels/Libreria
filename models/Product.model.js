const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart'},
    book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book'},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
  });
  const Products  = mongoose.model("Products", ProductSchema);

  module.exports = Products;