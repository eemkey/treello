export default function cards(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED_SUCCESS": {
      return action.board.lists
        .map((list) => {
          return list.cards;
        })
        .flat();
    }
    case "CREATE_CARD_SUCCESS": {
      return state.concat(action.card.card);
    }
    // case "GET_CARD_SUCCESS": {
    //   return [action.card];
    // }
    case "EDIT_CARD_SUCCESS": {
      return state.map(card => card._id === action.card_id ? action.card : card)
    }
    default:
      return state;
  }
}
