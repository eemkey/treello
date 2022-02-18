import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createListRequest() {
  return { type: types.CREATE_LIST_REQUEST };
}

export function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createList(boardId, listTitle, callback) {
  return function(dispatch) {
    dispatch(createListRequest());
    let newList = {
      boardId,
      list: {
        title: listTitle
      }
    }
    apiClient.createList(newList, data => {
      dispatch(createListSuccess(data.list));

      if (callback) {
        callback();
      }
    });
  };
}

// As a user
// When I'm on the board view page
// When I click on the "Add a List..." button
// I should see the button turn into an input field with "Add a List..." placeholder text
// And I fill the field with a new list's title
// And I click on the "Save" button
// The page should have an empty list with the title that I put in as the last list
// And there should be an "Add a List" button after the last list on the page

// Note: if the input is an empty string, the form doesn't disappear when we click the "Save" button. 


