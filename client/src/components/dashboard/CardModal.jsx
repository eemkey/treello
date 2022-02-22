import React, {useState} from "react";
import { useSelector } from "react-redux";
const CardModal = ({ cardId, onClose }) => {

  const card = useSelector((state) => {
    return state.cards.filter((card) => card._id === cardId);
  })[0];

  const list = useSelector((state) => {
    return state.lists.filter((list) => list._id === card.listId)
  })[0];

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [comments, setComment] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
 
  const pastDue = () => {
    if (card.dueDate === null) return null
    const now = Date.now();
    let dueDate = new Date(card.dueDate);
    
    if (now > dueDate) {
      return "(past due)"
    } else {
      return null
    }
  }

  const formatDueDate = (date) => {
    if (date === null) return "No Due Date"
    let dueDate = new Date(date).toDateString();

    let options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    let dueTime = new Date(date).toLocaleTimeString('en-US', options);
    
    dueDate = dueDate.split(" ").slice(1, 3).join(" ");
    return `${dueDate} ${dueTime}`
  }

  const toggleIsEditingDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  return (
    <>
      <div className="screen"></div>
      <div id="modal">
        <i onClick={onClose} className="x-icon icon close-modal"></i>
        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea className="list-title" style={{ height: "45px" }}>
            {title}
          </textarea>
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
                  <div className="member-container">
                  <div className="green label colorblindable"></div>
                  </div>
                  <div className="member-container">
                    <div className="yellow label colorblindable"></div>
                  </div>
                  <div className="member-container">
                    <div className="orange label colorblindable"></div>
                  </div>
                  <div className="member-container">
                    <div className="blue label colorblindable"></div>
                  </div>
                  <div className="member-container">
                    <div className="purple label colorblindable"></div>
                  </div>
                  <div className="member-container">
                    <div className="red label colorblindable"></div>
                  </div>
                  <div className="member-container">
                    <i className="plus-icon sm-icon"></i>
                  </div>
                </li>
                <li className="due-date-section">
                  <h3>Due Date</h3>
                  <div id="dueDateDisplay" className="overdue completed">
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
                {isEditingDescription ? 
                <div>
                  <textarea onChange={handleDescriptionChange} className="textarea-toggle" rows="1" autoFocus>
                    {card.description}
                  </textarea>
                  <div className="button" value="Save">
                    Save
                  </div>
                  <i className="x-icon icon" onClick={toggleIsEditingDescription}></i>
                </div> 
                : <span id="description-edit" className="link" onClick={toggleIsEditingDescription}>
                    Edit
                  </span> }
                  <p className="textarea-overlay">
                    {description}
                  </p>
                  <p id="description-edit-options" className="hidden">
                    You have unsaved edits on this field.{" "}
                    <span className="link">View edits</span> -{" "}
                    <span className="link">Discard</span>
                  </p>
              </form>
            </li>
            <li className="comment-section">
              <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>
                <div className="comment">
                  <label>
                    <textarea
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
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
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">
                <li>
                  <div className="member-container">
                    <div className="card-member">TP</div>
                  </div>
                  <h3>Taylor Peat</h3>
                  <div className="comment static-comment">
                    <span>The activities are not functional.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        The activities have not been implemented yet.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="member-container">
                    <div className="card-member small-size">VR</div>
                  </div>
                  <p>
                    <span className="member-name">Victor Reyes</span> changed the
                    background of this board <small>yesterday at 4:53 PM</small>
                  </p>
                </li>
                <li className="activity-comment">
                  <div className="member-container">
                    <div className="card-member">VR</div>
                  </div>
                  <h3>Victor Reyes</h3>
                  <div className="comment static-comment">
                    <span>Example of a comment.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        Example of a comment.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li className="date-button not-implemented">
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            <li className="archive-button">
              <i className="file-icon sm-icon "></i>Archive
            </li>
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default CardModal;
