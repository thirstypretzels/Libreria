const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WishListSchema = new mongoose.Schema({
  WishListNum: {
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: {
    type: "array",
    maxItems: 2,
    items: [{ type: mongoose.Schema.Types.ObjectId }, { type: Number }],
    required: true,
  },
});

const WishList = mongoose.model("Wish Lists", WishListSchema);
module.exports = WishList;
