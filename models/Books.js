const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number, //will definetly be a type of Money, a data structure we will define later.
    required: true,
  },
  rating: {
    type: Number, //rate out of 5 stars
    required: true,
  },
});

module.exports = Books = mongoose.model("Books", BookSchema);
