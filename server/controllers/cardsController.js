const Card = require("../models/card");
const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

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
        boardId: list.boardId
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
    .then((card) => {
      res.json({
        card,
      });
    })
    .catch((err) => {
      next(new HttpError("Cannot find card", 404));
    });
};

exports.createCard = createCard;
exports.getCard = getCard;
exports.sendCard = sendCard;
