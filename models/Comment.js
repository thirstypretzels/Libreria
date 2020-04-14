const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  writer: {
    type: String,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
