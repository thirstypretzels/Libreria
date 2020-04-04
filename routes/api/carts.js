const router = require('express').Router();
let Carts = require('../../models/Cart.model');

router.route('/').get((req, res) => {
  Carts.find()
    .then(carts => res.json(carts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const products = req.body.products;
  const newCart = new Carts({user, products});

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

router.route('/update/:id').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
      carts.user = req.body.user;
      carts.products = req.body.products;
      
      carts.save()
          .then(() => res.json('Cart Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;