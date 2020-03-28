const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    products: {
        books: { type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
        price: { type: Number, required: true},
        quantity: Number
    },
  });

  module.exports = Books = mongoose.model("carts", CartSchema);