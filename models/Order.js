const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },

  subtotal: { type: Number, required: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createDate: { type: Date, default: Date.now() },

  shipDate: { type: Date, default: Date.now() },

  status: { type: Boolean, default: false }
});

module.exports = mongoose.model("orders", OrderSchema);
