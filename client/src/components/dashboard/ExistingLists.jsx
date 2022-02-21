import React from "react";
import List from "./List";
import { useSelector } from "react-redux";

const ExistingLists = () => {
  const lists = useSelector((state) => state.lists);

  return (
    <div id="existing-lists" className="existing-lists">
      {lists.map((list) => {
        return <List key={list._id} list={list} />;
      })}
    </div>
  );
};

export default ExistingLists;
