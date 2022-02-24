import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import * as listActions from "../../actions/ListActions";
import * as cardActions from "../../actions/CardActions";

const List = ({ list, addFormListId, setAddFormListId }) => {
  const cards = useSelector((state) => {
    return state.cards.filter((card) => card.listId === list._id);
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [cardTitle, setCardTitle] = useState("");
  const dispatch = useDispatch();

  const addCard = (e) => {
    e.preventDefault();
    setAddFormListId(list._id);
  };

  const closeCardForm = (e) => {
    e.preventDefault();
    setAddFormListId("");
  }

  const isAdding = () => {
    return list._id === addFormListId;
  }
  const createCard = useCallback(
    (listId, title, callback) => {
      dispatch(cardActions.createCard(listId, title, callback));
    },
    [dispatch]
  );

  const handleCreateCard = (e) => {
    e.preventDefault();
    createCard(list._id, cardTitle, () => toggleAddingCard(e));
    setCardTitle("");
    setAddFormListId("");
  };

  const handleCardTitle = (e) => {
    setCardTitle(e.target.value);
  };

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleEditList = (e) => {
    e.preventDefault();
    editList(list._id, title, () => toggleIsEditing(e));
  };

  const editList = useCallback(
    (listId, title, callback) => {
      dispatch(listActions.editList(listId, title, callback));
    },
    [dispatch]
  );

  return (
    <div
      className={`list-wrapper ${isAdding() ? "add-dropdown-active" : ""}`}
    >
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {isEditing ? (
              <form onSubmit={handleEditList}>
                <input
                  type="text"
                  className="list-title"
                  value={title}
                  onChange={handleInputChange}
                  onBlur={handleEditList}
                />
              </form>
            ) : (
              <p onClick={toggleIsEditing} className="list-title">
                {title}
              </p>
            )}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map((card) => {
              return <Card key={card._id} card={card} />;
            })}
          </div>

          <div
            className={`add-dropdown add-bottom ${
              isAdding() ? "active-card" : ""
            }`}
          >
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card" onChange={handleCardTitle}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleCreateCard}>
              Add
            </a>
            <i className="x-icon icon" onClick={closeCardForm}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div
            onClick={addCard}
            className="add-card-toggle"
            data-position="bottom"
          >
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
