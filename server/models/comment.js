const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: String,
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: true
    }
  }, { timestamps: true }
)

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;