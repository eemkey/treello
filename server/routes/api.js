const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController")
const { validateCard, validateBoard } = require("../validators/validators");

router.get("/boards/:id", boardsController.getBoard);

router.get("/boards", boardsController.getBoards);

router.post("/boards", validateBoard, boardsController.createBoard);

router.post("/lists", listsController.createList, boardsController.updateBoard, listsController.sendList);

router.put("/lists/:id", listsController.editList, listsController.sendList);

router.post("/cards", validateCard, cardsController.createCard, listsController.updateList, cardsController.sendCard);

router.get("/cards/:id", cardsController.getCard);

module.exports = router;



