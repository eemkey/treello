export default function comments(state = [], action) {
  switch (action.type) {
    case "CREATE_COMMENT_SUCCESS": {
      console.log("action.comment", action.comment);
      return state.concat(action.comment);
    }
    case "GET_CARD_SUCCESS": {
      return action.card.comments;
    }
    default:
      return state;
  }
}
