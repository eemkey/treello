const List = require("../models/list");
const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const boardId = req.body.boardId;
    const board = await Board.findById(boardId);
    if (!board) {
      return next(new HttpError("The board doesn't exist", 404));
    } else {
      let newList = { boardId: req.body.boardId, title: req.body.list.title };
      List.create(newList).then((list) => {
        req.list = list;
        next();
      });
    }
  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
};

const editList = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.findByIdAndUpdate(req.params.id, req.body.list, {
      new: true,
    })
      .then((list) => {
        req.list = list;
        next();
      })
      .catch((e) => {
        next(new HttpError("the id does not exist", 404));
      });
  } else {
    return next(new HttpError("the title or position field(s) are empty", 422));
  }
};

const sendList = (req, res, next) => {
  return res.json(req.list);
};

const updateList = (req, res, next) => {
  List.findByIdAndUpdate(req.card.listId, {
    $push: { cards: req.card._id },
  }).then((card) => {
    res.json({
      card: req.card,
    });
  });
};

exports.createList = createList;
exports.editList = editList;
exports.sendList = sendList;
exports.updateList = updateList;
