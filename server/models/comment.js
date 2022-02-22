const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// {
//   "_id": 3,
//   "text": "This is my comment",
//   "cardId": 9,
//   "createdAt": "2020-10-08T18:23:59.803Z",
//   "updatedAt": "2020-10-08T18:23:59.803Z"
// }

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