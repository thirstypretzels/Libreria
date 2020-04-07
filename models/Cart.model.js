const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    books: { type: Array, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
  });
  const Carts  = mongoose.model("Carts", CartSchema);

  module.exports = Carts;