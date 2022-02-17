const Board = require("../models/board");
const List = require("../models/list");
const Card = require("../models/card");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json({
      boards,
    });
  });
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const getBoard = async (req, res, next) => {
  const id = req.params.id;
  const lists = await List.find({ boardId: id }).exec();

  lists.forEach(async (list) => {
    const cards = await Card.find({ listId: list._id }).exec();
    list.cards = cards;
  });

  Board.findById(id).then((board) => {
    board.lists = lists;
    res.json({
      board,
    });
  });
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;

/*{
  "_id": 1,
  "title": "Web dev",
  "createdAt": "2020-10-04T05:57:02.777Z",
  "updatedAt": "2020-10-04T05:57:02.777Z",
  "lists": [
    {
      "_id": 3,
      "title": "CSS",
      "boardId": 1,
      "createdAt": "2020-10-04T06:53:39.302Z",
      "updatedAt": "2020-10-04T06:53:39.302Z",
      "position": 65535.0,
      "cards": [
        {
          "_id": 7,
          "title": "1",
          "dueDate": null,
          "labels": [
            "red",
            "purple"
          ],
          "description": "Selectors",
          "listId": 3,
          "boardId": 1,
          "position": 65535.0,
          "commentsCount": 0
        }
      ]
    }
  ]
}
*/

// getBoard should have a populate method to replace specified paths in the
// document with the document(s) from other collection(s)

// - Handle the error when the board with the specified id doesn't exist.
