const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;

/* 
list schema
{
  "_id": 1,
  "title": "Updated title",
  "position": 137882.0,
  "boardId": 1,
  "createdAt": "2020-10-04T05:57:07.222Z",
  "updatedAt": "2020-10-06T23:48:44.540Z"
}
*/
