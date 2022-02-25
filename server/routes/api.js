const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const commentsController = require("../controllers/commentsController");
const { validateCard, validateBoard } = require("../validators/validators");

router.get("/boards/:id", boardsController.getBoard);

router.get("/boards", boardsController.getBoards);

router.post("/boards", validateBoard, boardsController.createBoard);

router.post(
  "/lists",
  listsController.createList,
  boardsController.updateBoard,
  listsController.sendList
);

router.put("/lists/:id", listsController.editList, listsController.sendList);

router.post(
  "/cards",
  validateCard,
  cardsController.createCard,
  listsController.addCardToList,
  cardsController.sendCard
);

router.get("/cards/:id", cardsController.getCard);

router.put("/cards/:id", cardsController.updateCard);

router.post(
  "/comments",
  commentsController.createComment,
  cardsController.addCommentToCard,
  commentsController.sendComment
);

module.exports = router;
