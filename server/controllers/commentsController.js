const Comment = require("../models/comment");
const Card = require("../models/card");
const HttpError = require("../models/httpError");

const createComment = async (req, res, next) => {
  const cardId = req.body.cardId;
  const card = await Card.findById(cardId);
  if (!card) {
    return next(new HttpError("The card doesn't exist", 404));
  } else {
    let newComment = {
      cardId: req.body.cardId,
      text: req.body.comment.text,
    };
    Comment.create(newComment).then(comment => {
    req.comment = comment;
      next();
    });
   }
};

const sendComment = async (req, res, next) => {
  return res.json(req.comment);
}

exports.createComment = createComment;
exports.sendComment = sendComment;