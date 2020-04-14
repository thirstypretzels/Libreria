const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const Books = require("../../models/Book.model");

router.route("/").get((req, res) => {
  Books.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const date = Date.parse(req.body.date);
  const description = req.body.description;
  const genre = req.body.genre;
  const price = Number(req.body.price);
  const rating = Number(req.body.rating);
  const topseller = Boolean(req.body.topseller)

  const newBook = new Books({
    title,
    image,
    author,
    publisher,
    date,
    description,
    genre,
    price,
    rating,
    topseller
  });

  newBook
    .save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Books.findById(req.params.id)
    .then(books => res.json(books))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Books.findByIdAndDelete(req.params.id)
    .then(books => res.json("Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Books.findById(req.params.id)
    .then(books => {
      books.title = req.body.title;
      books.image = req.body.image;
      books.author = req.body.author;
      books.publisher = req.body.publisher;
      books.date = Date.parse(req.body.date);
      books.description = req.body.description;
      books.genre = req.body.genre;
      books.price= Number(req.body.price);
      books.rating = Number(req.body.rating);
      books.topseller = Boolean(req.body.topseller)
      
      books.save()
        .then(() => res.json("Book Updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/users
// @desc register user
// @access Public
/*router.post(
  "/",
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("author", "An author is required."),
    check("price", "Please enter a valid price"),
    check("rating", "Test for first rating")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User route");
  }
);*/

module.exports = router;