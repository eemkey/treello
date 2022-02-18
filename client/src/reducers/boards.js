export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case "BOARD_FETCHED_SUCCESS": {
      const { lists, ...boardWithoutLists } = action.board;
      return [boardWithoutLists];
    }
    default:
      return state;
  }
}
