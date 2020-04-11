const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WishListSchema = new mongoose.Schema({
  WishListNum: {
    type: Number,
    required: true,
  },
  BookItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
});

const WishList = mongoose.model("ListOfWish", WishListSchema);
module.exports = WishList;
