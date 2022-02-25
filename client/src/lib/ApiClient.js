import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    // eslint-disable-next-line no-console
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    // eslint-disable-next-line no-console
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function (callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function (board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, { board })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function (id, callback) {
    return axios
      .get(`${routes.GET_BOARD_URL}${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function (newList, callback) {
    return axios
      .post(`${routes.CREATE_LIST_URL}`, { ...newList })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  editList: function (id, list, callback) {
    return axios
      .put(`${routes.EDIT_LIST_URL}${id}`, { ...list })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function (card, callback) {
    return axios
      .post(`${routes.CREATE_CARD_URL}`, card)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getCard: function (id, callback) {
    return axios
      .get(`${routes.GET_CARD_URL}${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  editCard: function (id, card, callback) {
    return axios
      .put(`${routes.EDIT_CARD_URL}${id}`, { ...card })
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createComment: function (comment, callback) {
    console.log("api client", "comment", comment);
    return axios
      .post(`${routes.CREATE_COMMENT_URL}`, comment)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
};

export default apiClient;

/* 
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
*/
