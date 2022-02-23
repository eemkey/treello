import { useLocation } from 'react-router-dom';

export default function findBoardId(id, state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const inCards = pathname.includes('cards');
  if (inCards) {
    const card = state.cards.find(card => card._id === id);
    if (card) {
      return card.boardId;
    } else {
      return;
    }
  } else {
    return id;
  }
}