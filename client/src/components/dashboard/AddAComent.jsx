import React, { useState, useCallback } from "react";
import * as commentActions from "../../actions/CommentActions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddAComment = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = useCallback(
    (id, comment, callback) => {
      dispatch(commentActions.createComment(id, comment, callback));
    },
    [dispatch]
  );

  const handleSaveComment = (e) => {
    e.preventDefault();
    saveComment(id, comment, () => setComment(""));
  };

  return (
    <>
      <h2 className="comment-icon icon">Add Comment</h2>
      <div>
        <div className="member-container">
          <div className="card-member">T1</div>
        </div>
        <div className="comment">
          <label>
            <textarea
              required=""
              rows="1"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <div>
              <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
              <a className="light-button attachment-icon sm-icon"></a>
            </div>
            <div>
              <input
                type="submit"
                className="button not-implemented"
                value="Save"
                onClick={handleSaveComment}
              />
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default AddAComment;
