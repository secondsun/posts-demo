import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  ADD_POST_ACTION,
  INCOMING_POST_ACTION
} from "./actionTypes";
import { combineReducers } from "redux";

const initialState = {
  user: null,
  posts: []
};

function user(state = null, action) {
  switch (action.type) {
    case REGISTER_ACTION:
    case LOGIN_ACTION:
      const user = action.payload;
      return { username: user.username } ;
    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case ADD_POST_ACTION:
    case INCOMING_POST_ACTION:
      const post = action.payload;
      return [post, ...state.posts];
    default:
      return state;
  }
}

export default combineReducers({user, posts});
