const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("req.body", req.body)
  if (errors.isEmpty()) {
    const boardId = req.body.boardId
    const board = await Board.findById( boardId )
    if (!board) {
     return next(new HttpError("The board doesn't exist", 404));
    } else {
      let newList = { boardId: req.body.boardId, title: req.body.list.title}
      List.create(newList)
        .then(list => {
          req.list = list;
          next();
        })
    }
  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
}

const sendList = (req, res, next) => {
  return res.json(req.list);
}

exports.createList = createList;
exports.sendList = sendList;