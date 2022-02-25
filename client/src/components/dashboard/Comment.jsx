import React from "react";

const Comment = ({ comment }) => {
  const formatDate = () => {
    let createdDate = new Date(comment.createdAt).toDateString();

    let options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    let createdTime = new Date(comment.createdAt).toLocaleTimeString(
      "en-US",
      options
    );

    createdDate = createdDate.split(" ").slice(1, 3).join(" ");
    return `${createdDate} ${createdTime}`;
  };

  return (
    <>
      <div className="member-container">
        
      </div>
      <h3>Team 1</h3>
      <div className="comment static-comment">
         <span>{comment.text}</span> 
      </div>

      {/*<div className="comment">
        <label>
          <textarea required="" rows="1">
            {comment.text}
          </textarea>
           <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div> */}
          {/* <div>
            <p>You haven&apos;t typed anything!</p>
            <input
              type="submit"
              className="button not-implemented"
              value="Save"
            />
            <i className="x-icon icon"></i>
          </div> 
        </label>
      </div>*/}
      <small>
        {formatDate()} - <span className="link">Edit</span> -{" "}
        <span className="link">Delete</span>
      </small>
    </>
  );
};

export default Comment;
