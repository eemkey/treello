import React, { useCallback } from "react";
import * as cardActions from "../../actions/CardActions";
import { useDispatch } from "react-redux";

const LabelsPopover = ({ card, toggleShowLabels }) => {
  const dispatch = useDispatch();
  const labelColors = ["green", "yellow", "orange", "red", "purple", "blue"];

  const handleUpdateLabels = (color) => {
    let colorAlreadyExists = card.labels.find((c) => c === color);
    let newLabels;
    if (colorAlreadyExists) {
      newLabels = card.labels.filter((c) => c !== color);
    } else {
      newLabels = card.labels.concat(color);
    }
    editCard(card._id, { labels: newLabels });
  };

  const editCard = useCallback(
    (cardId, editedCard, callback) => {
      dispatch(cardActions.editCard(cardId, editedCard, callback));
    },
    [dispatch]
  );

  const colorSelected = (color) => {
    if (card.labels.includes(color)) {
      return "check-icon sm-icon";
    } else {
      return "";
    }
  };

  const labels = labelColors.map((color, idx) => {
    return (
      <li key={color} onClick={() => handleUpdateLabels(color)}>
        <div className={`${color} colorblindable" data-id="${idx + 1}"`}>
          <i className={colorSelected(color)}></i>
        </div>
        <div className={`label-background ${color}`}></div>
        <div className="label-background-overlay"></div>
        <i className="edit-icon icon not-implemented"></i>
      </li>
    );
  });

  return (
    <div className="popover labels">
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a
            href="#"
            onClick={toggleShowLabels}
            className="icon-sm icon-close"
          ></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">{labels}</ul>
            <ul className="light-list">
              <li className="not-implemented">Create a new label</li>
              <hr />
              <li className="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;
