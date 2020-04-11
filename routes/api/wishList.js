const router = require("express").Router();
let WishList = require("../../models/WishList.model");
let Carts = require("../../modelsCart.model");
let Books = require("../../models/Book.model");

function searchArray(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] == id) {
      return true;
    }
  }
  return false;
}
function findPosition(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] == id) {
      return i;
    }
  }
}

outer.route("/").get((req, res) => {
  WishList.find()
    .then((wishList) => res.json(wishList))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const user = req.body.user;
  const product = req.body.product;
  const newWishList = new WishList({ user, product });

  newWishList
    .save()
    .then(() => res.json("Wish List added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  WishList.findById(req.params.id)
    .then((wishList) => res.json(wishList))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  WishList.findByIdAndDelete(req.params.id)
    .then((wishList) => res.json("Deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id/:cartId").post((req, res) => {
  WishList.findById(req.params.id)
    .then((wishList) => {
      if (searchArray(wishList.product, req.params.bookId)) {
        let pos = findPosition(wishList.product, req.params.bookId);
        Carts.findById(req.params.cartId).then((carts) => {
          newBook = carts.price;
          let fin = wishList.product[pos][1] + 1;
          wishList.product[pos][1] = fin;
          wishList
            .save()
            .then(() => res.json("Wish List Updated!" + pos))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      } else if (!searchArray(wishList.product, req.params.bookId)) {
        wishList.product.push([req.params.bookId, 1]);
        Carts.findById(req.params.cartID).then((carts) => {
          newBook = carts.price;
          wishList
            .save()
            .then(() => res.json("Wish List Updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      } else {
        let none = null;
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/updateDelete/:id/:bookId").post((req, res) => {
  WishList.findById(req.params.id)
    .then((wishList) => {
      if (searchArray(wishList.product, req.params.bookId)) {
        let pos = findPosition(wishList.product, req.params.bookId);
        wishList.product.splice(pos, 1);
        Books.findById(req.params.bookId).then((book) => {
          newBook = book.price;
          wishList
            .save()
            .then(() => res.json("Wish list Updated!" + pos))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  WishList.findById(req.params.id)
    .then((wishList) => {
      WishList.title = req.body.title;
      WishList.author = req.body.author;
      WishList.price = Number(req.body.price);
      WishList.save()
        .then(() => res.json("Wish List Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
