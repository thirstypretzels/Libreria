const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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
