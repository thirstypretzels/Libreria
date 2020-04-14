const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String
  },
  date: {
    type: Date,
  },
  description: {
    type: String
  },
  genre: {
    type: String,
  },
  price: {
    type: Number, //will definetly be a type of Money, a data structure we will define later.
    required: true,
  },
  rating: {
    type: Number, //rate out of 5 stars
    required: true,
  },
  topseller: {
    type: Boolean
  }

});

module.exports = Books = mongoose.model("Books", BookSchema);