import { combineReducers } from "redux";
import boards from "./boards";
import lists from "./lists";
import cards from "./cards";
import comments from "./comments";

const rootReducer = combineReducers({ boards, lists, cards, comments });

export default rootReducer;
