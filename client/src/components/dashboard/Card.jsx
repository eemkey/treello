import React from "react";
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const formatDueDate = () => {
    if (card.dueDate) {
      let dueDate = new Date(card.dueDate).toDateString();
      return dueDate.split(" ").slice(1, 3).join(" ");
    } else {
      return "No Due Date";
    }
  };

  const labels = () => {
    if (card.labels.length === 0) {
      return null;
    } else {
      return card.labels.map((color) => {
        return (
          <div className={`card-label ${color} colorblindable`}></div>     
        );
      });
    }
  };

  return (
    <div className="card-background">
      <Link to={`/cards/${card._id}`}>
        <div className="card">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {labels()}
            <p>{card.title}</p>
          </div>
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              {formatDueDate()}
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
