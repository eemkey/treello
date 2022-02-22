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

export function editCardRequest() {
  return { type: types.EDIT_CARD_REQUEST };
}

export function editCardSuccess(card) {
  return { type: types.EDIT_CARD_SUCCESS, card };
}

export function editCard(id, card, callback) {
  return function (dispatch) {
    dispatch(editCardRequest())
    let editedCard = {
      card: {...card }
    }
    apiClient.editCard(id, editedCard, (data) => {
      dispatch(editCardSuccess(data))

      if (callback) {
        callback()
      }
    })
  }
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
