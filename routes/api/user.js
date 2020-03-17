const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
let Users = require('./models/User');

router.route('/').get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const loginID = req.body.loginID;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const nickName = req.body.nickName;
  const address = req.body.address;
  const creditCards = req.body.creditCards;
  const newUsers= new Users({loginID,password,email,name,nickName,address,creditCards});

  newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Users.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Users.findByIdAndDelete(req.params.id)
    .then(users => res.json('Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  Users.findById(req.params.id)
    .then(users => {
        users.loginID = req.body.loginID;
        users.password = req.body.password;
        users.email = req.body.email;
        users.name = req.body.name;
        users.nickName = req.body.nickName;
        users.address = req.body.address;
        users.creditCards = req.body.creditCards;
      newUser.save()
          .then(users => res.json('Book Updated!'))
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