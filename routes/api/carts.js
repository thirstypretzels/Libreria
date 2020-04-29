const router = require('express').Router();
let Carts = require('../../models/Cart.model');
let Books = require('../../models/Book.model');

function searchArray(array, id){
  for(let i=0;i<array.length;i++){
    if(array[i][0] == id){
      return true;
    }
  }
  return false;
}
function findPosition(array, id){
  for(let i=0;i<array.length;i++){
    if(array[i][0] == id){
      return i;
    }
  }
}
function findSavedPosition(array, id){
  for(let i=0;i<array.length;i++){
    if(array[i] == id){
      return i;
    }
  }
}


router.route('/').get((req, res) => {
  Carts.find()
    .then(carts => res.json(carts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const product = req.body.product;
  const subtotal = req.body.subtotal;
  const save4L8r = req.body.save4L8r;
  const newCart = new Carts({user, product, subtotal, save4L8r});

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
      if(searchArray(carts.product, req.params.bookId)){
        let pos = findPosition(carts.product, req.params.bookId);
            Books.findById(req.params.bookId)
            .then(book => {newBook = book.price;
            carts.subtotal = carts.subtotal + newBook;
            let fin = carts.product[pos][1] +1;
            carts.product[pos][1] = fin; 
            carts.save()
                .then(() => res.json('Cart Updated!' + pos))
                .catch(err => res.status(400).json('Error: ' + err));
        })
      }
      else if (!searchArray(carts.product, req.params.bookId)){
            carts.product.push([req.params.bookId, 1]);
            Books.findById(req.params.bookId)
            .then(book => {newBook = book.price;
            carts.subtotal = carts.subtotal + newBook;
            carts.save()
                .then(() => res.json('Cart Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })}
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateDelete/:id/:bookId').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
      if(searchArray(carts.product, req.params.bookId)){
        let pos = findPosition(carts.product, req.params.bookId);
        carts.product.splice(pos,1);
            Books.findById(req.params.bookId)
            .then(book => {newBook = book.price;
            carts.subtotal = carts.subtotal - newBook;
            carts.save()
                .then(() => res.json('Cart Updated!' + pos))
                .catch(err => res.status(400).json('Error: ' + err));
        })
      }})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateDeleteSaveForLater/:id/:bookId').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
        let pos = findSavedPosition(carts.save4L8r, req.params.bookId);
        carts.save4L8r.splice(pos,1);
        carts.save()
        .then(() => res.json('Cart Updated!' + pos))
        .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateSaveForLater/:id/:bookId').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
      if(searchArray(carts.product, req.params.bookId)){
        let pos = findPosition(carts.product, req.params.bookId);
        let hold = carts.product[pos][0];
        carts.save4L8r.push(hold);
        carts.product.splice(pos,1);
            Books.findById(req.params.bookId)
            .then(book => {newBook = book.price;
            carts.subtotal = carts.subtotal - newBook;
            carts.save()
                .then(() => res.json('Cart Updated!' + pos))
                .catch(err => res.status(400).json('Error: ' + err));
        })
      }})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Carts.findById(req.params.id)
    .then(carts => {
      carts.user = req.body.user;
      carts.product = req.body.product;
      carts.subtotal = Number(req.body.subtotal);
      carts.save4L8r = req.body.save4L8r;
      carts.save()
          .then(() => res.json('Cart Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;