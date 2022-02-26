const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Comment = require("../models/comment");

const createCard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const listId = req.body.listId;
    const list = await List.findById(listId);
    if (!list) {
      return next(new HttpError("The list doesn't exist", 404));
    } else {
      let newCard = {
        listId: req.body.listId,
        title: req.body.card.title,
        boardId: list.boardId,
      };
      Card.create(newCard).then((card) => {
        req.card = card;
        next();
      });
    }
  } else {
    return next(new HttpError("The input field is empty.", 422));
  }
};

const sendCard = (req, res, next) => {
  return res.json(req.card);
};

const getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .populate({
      path: "comments",
    })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      next(new HttpError("Cannot find card", 404));
    });
};

const addCommentToCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.body.cardId, {
    $push: { comments: req.comment._id },
  }).then(() => {
    next();
  });
};

const updateCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, req.body.card, { new: true }).then(
    (card) => {
      res.json(card);
    }
  );
};

const deleteCard = (req, res, next) => {
  let id = req.params.id;
  Card.pre("remove", function (next) {
    Comment.remove({ cardId: id }).exec();
    next();
  });
};

exports.createCard = createCard;
exports.getCard = getCard;
exports.sendCard = sendCard;
exports.updateCard = updateCard;
exports.addCommentToCard = addCommentToCard;
exports.deleteCard = deleteCard;
