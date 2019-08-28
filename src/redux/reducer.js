import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  ADD_POST_ACTION,
  INCOMING_POST_ACTION
} from "./actionTypes";
import { combineReducers } from "redux";

function user(state = {}, action) {

  switch (action.type) {
    case REGISTER_ACTION:
    case LOGIN_ACTION:
      console.log("user " + action.payload.username)
      const user = action.payload;
      return { username: user.username } ;
    default:
      return state;
  }
}

function posts(state = [{author:'Test author', text:'Test text'}], action) {
  switch (action.type) {
    case ADD_POST_ACTION:
    case INCOMING_POST_ACTION:
      const post = action.payload;
      return [post, ...state];
    default:
      return state;
  }
  
}

export default combineReducers({user, posts});
