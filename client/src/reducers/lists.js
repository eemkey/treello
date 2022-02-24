export default function lists(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED_SUCCESS": {
      let { lists } = action.board;
      return lists.map(list => {
        // eslint-disable-next-line no-unused-vars
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      })
    }
    case "CREATE_LIST_SUCCESS": {
      return state.concat(action.list)
    }
    case "EDIT_LIST_SUCCESS": {
      return state.map(list => list._id === action.list._id ? action.list : list);
    }
    // case "GET_CARD_SUCCESS": {
    //   return [action.card.listId];
    // }
    default:
      return state;
  }
}
