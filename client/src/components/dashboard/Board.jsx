import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../actions/BoardActions";
import ExistingLists from "./ExistingLists";
import AddAList from "./AddAList";
import findBoardId from "../../lib/findBoardId";

const Board = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const boardId = findBoardId(id, state);
  const board = useSelector((state) =>
    state.boards.find((b) => b._id === boardId)
  );
  const [addFormListId, setAddFormListId] = useState("");

  useEffect(() => {
    if (!boardId) return;
    dispatch(actions.fetchBoard(boardId));
  }, [dispatch, boardId]);

  if (!board) {
    return null;
  } else {
    return (
      <>
        <header>
          <ul>
            <li id="title">{board.title}</li>
            <li className="star-icon icon"></li>
            <li className="private private-icon icon">Private</li>
          </ul>
          <div className="menu">
            <i className="more-icon sm-icon"></i>Show Menu
          </div>
          <div className="subscribed">
            <i className="sub-icon sm-icon"></i>Subscribed
          </div>
        </header>

        <main>
          <div id="list-container" className="list-container">
            <ExistingLists
              addFormListId={addFormListId}
              setAddFormListId={setAddFormListId}
            />
            <AddAList />
          </div>
        </main>
      </>
    );
  }
};

export default Board;
