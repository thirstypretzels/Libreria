const router = require('express').Router();
let Orders = require('../../models/Order.model');

router.route('/').get((req, res) => {
  Orders.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const cart = req.body.cart;
  const subtotal = req.body.subtotal;
  const user = req.body.user;
  const createDate = req.body.createDate;
  const shipDate = req.body.shipDate;
  const status= req.body.status;
  const newOrder = new orders({cart,subtotal, user,createDate,shipDate,status});

  newOrder.save()
      .then(() => res.json('Order added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Orders.findById(req.params.id)
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Orders.findByIdAndDelete(req.params.id)
    .then(orders => res.json('Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Orders.findById(req.params.id)
    .then(orders => {
      orders.cart = req.body.cart;
      orders.subtotal = req.body.subtotal;
      orders.user = req.body.user;
      orders.createDate = req.body.createDate;
      orders.shipDate = req.body.shipDate;
      orders.status = req.body.status;

      orders.save()
          .then(() => res.json('Order Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;