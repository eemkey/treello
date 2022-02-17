import React from "react";
import { useSelector } from "react-redux";
import AddACard from "./AddACard";
import Card from "./Card"

const List = ( {list} ) => {
const cards = useSelector((state) => state.cards.filter(card => card.listId === list._id));
console.log(cards)

  return (
    <div className="list-wrapper">
    <div className="list-background">
      <div className="list">
        <a className="more-icon sm-icon" href=""></a>
        <div>
          <p className="list-title">{list.title}</p>
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
            {cards.map(card => {
              return <Card key={card._id} card={card}/>
            })}
        </div>
      
        <div className="add-dropdown add-bottom">
          <div className="card">
            <div className="card-info"></div>
            <textarea name="add-card"></textarea>
            <div className="members"></div>
          </div>
          <a className="button">Add</a>
          <i className="x-icon icon"></i>
          <div className="add-options">
            <span>...</span>
          </div>
        </div>
        <AddACard />
      </div>
    </div>
  </div>
  )
}

export default List;