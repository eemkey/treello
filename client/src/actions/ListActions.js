import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createList(boardId, listTitle, callback) {
  return function (dispatch) {
    dispatch(createListRequest());
    let newList = {
      boardId,
      list: {
        title: listTitle,
      },
    };
    apiClient.createList(newList, (data) => {
      dispatch(createListSuccess(data.list));

      if (callback) {
        callback();
      }
    });
  };
}

export function editListRequest() {
  return { type: types.EDIT_LIST_REQUEST };
}

export function editListSuccess(list) {
  return { type: types.EDIT_LIST_SUCCESS, list };
}

export function editList(listId, title, callback) {
  return function (dispatch) {
    dispatch(editListRequest());
    let editedList = {
      list: { title },
    };
    apiClient.editList(listId, editedList, (data) => {
      dispatch(editListSuccess(data));

      if (callback) {
        callback();
      }
    });
  };
}
