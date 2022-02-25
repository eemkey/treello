import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCommentRequest() {
  return { type: types.CREATE_COMMENT_REQUEST };
}

export function createCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment };
}

export function createComment(cardId, commentText, callback) {
  return function (dispatch) {
    dispatch(createCommentRequest());
    let newComment = {
      cardId,
      comment: {
        text: commentText,
      },
    };
    apiClient.createComment(newComment, (data) => {
      dispatch(createCommentSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}
