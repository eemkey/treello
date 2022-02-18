export default function lists(state = [], action) {
  switch (action.type) {
    case "BOARD_FETCHED_SUCCESS": {
      // lists is an array of objects and each object has a cards array
      let { lists } = action.board;
      return lists.map(list => {
        // return a list without the cards array
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      })
    }
    default:
      return state;
  }
}
