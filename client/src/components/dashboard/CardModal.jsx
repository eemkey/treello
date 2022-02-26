import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as cardActions from "../../actions/CardActions";
import AddAComment from "./AddAComent";
import Comments from "./Comments";
import LabelsPopover from "./LabelsPopover";
import DueDatePopover from "../ui/DueDatePopover";

const CardModal = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const id = useParams().id;

  const card = useSelector((state) => {
    return state.cards.filter((card) => card._id === id);
  })[0];

  const lists = useSelector((state) => {
    return state.lists;
  });

  let list;

  if (card) {
    list = lists.find((l) => l._id === card.listId);
  }

  useEffect(() => {
    dispatch(cardActions.getCard(id));
  }, [dispatch, id]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComment] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);

  const toggleShowLabels = () => {
    setShowLabels(!showLabels);
  };

  const toggleShowDueDate = () => {
    console.log("clicked toggleShowDueDate");
    setShowDueDate(!showDueDate);
  };

  const pastDue = () => {
    if (card.dueDate === null) return null;
    const now = Date.now();
    let dueDate = new Date(card.dueDate);

    if (now > dueDate) {
      return "(past due)";
    } else {
      return null;
    }
  };

  const formatDueDate = (date) => {
    if (date === null) return "No Due Date";
    let dueDate = new Date(date).toDateString();

    let options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    let dueTime = new Date(date).toLocaleTimeString("en-US", options);

    dueDate = dueDate.split(" ").slice(1, 3).join(" ");
    return `${dueDate} ${dueTime}`;
  };

  const labels = () => {
    if (card.labels.length === 0) {
      return null;
    } else {
      return card.labels.map((color) => {
        return (
          <div className="member-container">
            <div className={`${color} label colorblindable`}></div>
          </div>
        );
      });
    }
  };

  const toggleIsEditingDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const exitModal = () => {
    history.push(`/boards/${card.boardId}`);
  };

  const editCard = useCallback(
    (cardId, editedCard, callback) => {
      dispatch(cardActions.editCard(cardId, editedCard, callback));
    },
    [dispatch]
  );

  const handleUpdateTitle = (e) => {
    e.preventDefault();
    if (title !== "") {
      editCard(card._id, { title });
    }
  };

  const handleUpdateDescription = (e) => {
    e.preventDefault();
    if (description !== card.description) {
      editCard(card._id, { description });
    }
    toggleIsEditingDescription();
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        exitModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleOpenDescription = (e) => {
    e.preventDefault();
    setDescription(card.description);
    toggleIsEditingDescription();
  };

  const handleArchiveCard = (e) => {
    editCard(card._id, { archived: !card.archived });
  };

  if (!card || !list) {
    return null;
  } else {
    return (
      <div id="modal-container">
        <div onClick={exitModal} className="screen"></div>
        <div onClick={(e) => e.stopPropagation()} id="modal">
          <i onClick={exitModal} className="x-icon icon close-modal"></i>
          {card.archived ? (
            <div className="archived-banner">
              <i className="file-icon icon"></i>This card is archived.
            </div>
          ) : null}
          <header>
            <i className="card-icon icon .close-modal"></i>
            <textarea
              className="list-title"
              style={{ height: "45px" }}
              onBlur={handleUpdateTitle}
              defaultValue={card.title}
              onChange={handleTitleChange}
            ></textarea>
            <p>
              in list <a className="link">{list.title}</a>
              <i className="sub-icon sm-icon"></i>
            </p>
          </header>
          <section className="modal-main">
            <ul className="modal-outer-list">
              <li className="details-section">
                <ul className="modal-details-list">
                  <li className="labels-section">
                    <h3>Labels</h3>
                    {labels()}
                    <div className="member-container">
                      <i
                        onClick={toggleShowLabels}
                        className="plus-icon sm-icon"
                      ></i>
                    </div>
                  </li>
                  <li className="due-date-section">
                    <h3>Due Date</h3>
                    <div
                      id="dueDateDisplay"
                      onClick={toggleShowDueDate}
                      className="overdue completed"
                    >
                      <input
                        id="dueDateCheckbox"
                        type="checkbox"
                        className="checkbox"
                        checked=""
                      />
                      {formatDueDate(card.dueDate)} <span>{pastDue()}</span>
                    </div>
                  </li>
                </ul>
                <form className="description">
                  <p>Description</p>
                  {isEditingDescription ? (
                    <div>
                      <textarea
                        onChange={handleDescriptionChange}
                        className="textarea-toggle"
                        rows="1"
                        autoFocus
                        defaultValue={card.description}
                      ></textarea>
                      <div
                        onClick={handleUpdateDescription}
                        className="button"
                        value="Save"
                      >
                        Save
                      </div>
                      <i
                        className="x-icon icon"
                        onClick={toggleIsEditingDescription}
                      ></i>
                    </div>
                  ) : (
                    <span
                      id="description-edit"
                      className="link"
                      onClick={handleOpenDescription}
                    >
                      Edit
                    </span>
                  )}
                  <p className="textarea-overlay">{card.description}</p>
                  <p id="description-edit-options" className="hidden">
                    You have unsaved edits on this field.{" "}
                    <span className="link">View edits</span> -{" "}
                    <span className="link">Discard</span>
                  </p>
                </form>
              </li>
              <li className="comment-section">
                <AddAComment />
              </li>
              <li className="activity-section">
                <Comments />
              </li>
            </ul>
          </section>
          <aside className="modal-buttons">
            <h2>Add</h2>
            <ul>
              <li className="member-button">
                <i className="person-icon sm-icon"></i>Members
              </li>
              <li onClick={toggleShowLabels} className="label-button">
                <i className="label-icon sm-icon"></i>Labels
              </li>
              {showLabels ? (
                <LabelsPopover
                  toggleShowLabels={toggleShowLabels}
                  card={card}
                />
              ) : null}
              <li className="checklist-button">
                <i className="checklist-icon sm-icon"></i>Checklist
              </li>
              <li
                onClick={toggleShowDueDate}
                className="date-button not-implemented"
              >
                <i className="clock-icon sm-icon"></i>Due Date
              </li>
              {showDueDate ? (
                <DueDatePopover
                  toggleShowDueDate={toggleShowDueDate}
                  card={card}
                />
              ) : null}
            </ul>
            <h2>Actions</h2>
            <ul>
              <li className="subscribe-button">
                <i className="sub-icon sm-icon"></i>Subscribe
                <i className="check-icon sm-icon"></i>
              </li>
              <hr />
              {card.archived ? (
                <div>
                  <li className="unarchive-button">
                    <i className="send-icon sm-icon"></i>Send to board
                  </li>
                  <li className="red-button">
                    <i className="minus-icon sm-icon"></i>Delete
                  </li>
                </div>
              ) : (
                <li className="archive-button" onClick={handleArchiveCard}>
                  <i className="file-icon sm-icon "></i>Archive
                </li>
              )}
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Share and more...</li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }
};

export default CardModal;
