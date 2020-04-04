const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  loginID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true
  },
  address: {
    type: String, //would likely be an address type, for now using string as filler
    required: true
  },
  creditCards: {
    type: Array,
    required: true //probably will not be required at first registration, but required for purchases.
  }
});
const Users  = mongoose.model("Users", UserSchema);

module.exports = Users;