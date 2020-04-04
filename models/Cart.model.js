const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    products: {
        books: { type: Array, ref: 'Book'},
        price: { type: Array, required: true},
        quantity: Number
    },
  });
  const Carts  = mongoose.model("Carts", CartSchema);

  module.exports = Carts;