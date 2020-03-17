const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
let Books = require('./models/Book');

router.route('/').get((req, res) => {
  Books.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const rating = req.body.rating;
  const newBook = new Books({title,author, price,rating});

  newBook.save()
      .then(() => res.json('Book added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Books.findById(req.params.id)
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Books.findByIdAndDelete(req.params.id)
    .then(books => res.json('Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  Books.findById(req.params.id)
    .then(books => {
      books.title = req.body.title;
      books.author = req.body.author;
      books.price = req.body.price;
      books.rating = req.body.rating;

      newBook.save()
          .then(() => res.json('Book Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/users
// @desc register user
// @access Public
router.post(
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
);

module.exports = router;
