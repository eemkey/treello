const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: String,
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    description: String,
    labels: [
      {
        type: String,
      },
    ],
    archived: Boolean,
    dueDate: Date,
    completed: Boolean,
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],
    actions: [
      {
        type: String,
      },
    ],
    commentsCount: Number,
  },
  { timestamp: true }
);

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;

// {
//   "description": "",
//   "labels": [],
//   "position": 65535.0,
//   "archived": false,
//   "dueDate": null,
//   "completed": false,
//   "boardId": 1,
//   "comments": [],
//   "actions": []
//   "commentsCount": 0
// }
