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

  // save or click on the X - set isadding to false
  // handleSaveClick -> send the post request, update state, rerender component 
      //and hide input field/save button, show add button

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

/* 
When the create a list button tile is clicked, it should add 
the selected class to the #new-list.new-list element. This will 
display the form. When either the “Save” or “X” buttons are 
clicked, the selected class should be removed.
*/
export default AddAList;