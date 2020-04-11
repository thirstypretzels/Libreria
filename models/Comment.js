const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
