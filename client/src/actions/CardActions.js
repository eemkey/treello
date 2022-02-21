import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardRequest() {
  return { type: types.CREATE_CARD_REQUEST };
}

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card };
}

export function getCardRequest() {
  return { type: types.GET_CARD_REQUEST };
}

export function getCardSuccess(card) {
  return { type: types.GET_CARD_SUCCESS, card };
}

export function getCard(id) {
  return function (dispatch) {
    dispatch(getCardRequest());
    apiClient.getCard(id, (data) => dispatch(getCardSuccess(data)));
  };
}

export function createCard(listId, cardTitle, callback) {
  return function (dispatch) {
    dispatch(createCardRequest());
    let newCard = {
      listId,
      card: {
        title: cardTitle,
      },
    };
    apiClient.createCard(newCard, (data) => {
      dispatch(createCardSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}
