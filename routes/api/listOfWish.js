const router = require("express").Router();
let ListOfWish = require("../../models/ListOfWish.model");

router.route("/:id").get((req, res) => {
  ListOfWish.findById(req.params.id)
    .then((listOfWish) => res.json(listOfWish))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const listNum = req.body.listNum;
  const lsitName = req.body.lsitName;
  const userId = req.body.userId;
  const newWishList = new ListOfWish({ lintNum, product, userId });

  newCart
    .save()
    .then(() => res.json("Wish List was added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  ListOfWish.findByIdAndDelete(req.params.id)
    .then((listOfWish) => res.json("Deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;