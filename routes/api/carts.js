const router = require('express').Router();
let Carts = require('../../models/Cart.model');
let Books = require('../../models/Book.model');

router.route('/').get((req, res) => {
  Carts.find()
    .then(carts => res.json(carts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const books = req.body.books;
  const price = req.body.price;
  const quantity = req.body.quantity; 
  const newCart = new Carts({user, books, price, quantity});

  newCart.save()
      .then(() => res.json('Cart added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => res.json(carts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Carts.findByIdAndDelete(req.params.id)
    .then(carts => res.json('Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id/:bookId').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
      carts.books.push(req.params.bookId);
      newPrice = Books.findById(req.params.bookId).price
      carts.price = carts.price + 3;
      carts.save()
          .then(() => res.json('Cart Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
      carts.user = req.body.user;
      carts.books = req.body.books;
      carts.price = Number(req.body.price);
      carts.quantity = Number(req.body.quantity);
      carts.save()
          .then(() => res.json('Cart Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;