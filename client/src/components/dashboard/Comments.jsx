import React from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";

const Comments = () => {
  const comments = useSelector((state) => {
    return state.comments;
  });

  if (!comments) {
    return null;
  } else {
    return (
      <li className="activity-comment">
        {comments.map((comment) => {
          return <Comment key={comment._id} comment={comment} />;
        })}
      </li>
    );
  }
};

export default Comments;
