export default function cards(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED_SUCCESS": {
      return action.board.lists.map(list => {
        return list.cards;
      }).flat();
    }
    default:
      return state;
  }
}
