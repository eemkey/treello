import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../actions/ListActions";

const AddAList = () => {
  const board = useSelector((state) => state.boards[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const toggleIsAdding = (e) => {
    e.preventDefault();
    setIsAdding(!isAdding)
  }

  const createList = useCallback((boardId, title, callback) => {
    dispatch(actions.createList(boardId, title, callback))
  }, [dispatch])

  const handleSave = (e) => {
    e.preventDefault();
    createList(board._id, title, (() => toggleIsAdding(e)));
    setTitle("");
  }

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  }
  
  return (
    <div id="new-list" className={`new-list ${isAdding ? "selected" : ""}`}>
      <span onClick={toggleIsAdding}>Add a list...</span>
      <input type="text" placeholder="Add a list..." value={title} onChange={handleInputChange}/>
      <div>
        <input type="submit" className="button" value="Save" onClick={handleSave} />
        <i className="x-icon icon"  onClick={toggleIsAdding}></i>
      </div>
    </div>
  )
}

export default AddAList;