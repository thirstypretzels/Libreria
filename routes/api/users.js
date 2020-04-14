const router = require('express').Router();
let Users = require("../../models/User.model");

router.route("/").get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const loginID = req.body.loginID;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const nickName = req.body.nickName;
  const address = req.body.address;
  const creditCards = req.body.creditCards;
  const newUsers = new Users({
    loginID,
    password,
    email,
    name,
    nickName,
    address,
    creditCards
  });

  newUsers.save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(users => res.json("Deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/updated/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then(users => {
      users.loginID = req.body.loginID;
      users.password = req.body.password;
      users.email = req.body.email;
      users.name = req.body.name;
      users.nickName = req.body.nickName;
      users.address = req.body.address;
      users.creditCards = req.body.creditCards;

      users.save()
        .then(users => res.json("User Updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
