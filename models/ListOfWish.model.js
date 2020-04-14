const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListOfWishSchema = new mongoose.Schema({
  wishListNum: {
    type: Number,
    maxItems: 3,
    required: true,
  },
  ListName: {
    type: String,
    required: true,
  },
  UserID: {
    type: Number,
    required: true,
  },
});
const ListOfWish = mongoose.model("ListOfWish", ListOfWishSchema);
module.exports = ListOfWish;