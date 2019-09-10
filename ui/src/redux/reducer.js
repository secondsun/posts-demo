import {
  LOGIN_ACTION,
  REGISTER_ACTION,
  ADD_POST_ACTION,
  REGISTER_WEB_PUSH,
  INCOMING_POST_ACTION, FILTER_ACTION
} from "./actionTypes";
import { combineReducers } from "redux";

function push(state = {enabled:false}, action) {
  switch(action.type) {
    case REGISTER_WEB_PUSH: 
    console.log("registering push " + action.payload.enabled)
      return {enabled:action.payload.enabled}
    default:
      return state;
  }
}

function user(state = {}, action) {

  switch (action.type) {
    case REGISTER_ACTION:
    case LOGIN_ACTION:
      const user = action.payload;
      return { username: user.username } ;
    default:
      return state;
  }
}

function filter(state = "", action) {
  switch (action.type) {
    case FILTER_ACTION:
        return action.payload;
    default:
      return state;
  }
  
}

function posts(state = [], action) {
  switch (action.type) {
    case ADD_POST_ACTION:
        const post = action.payload;
        return [post, ...state];
    case INCOMING_POST_ACTION:
        const posts = action.payload;
        return posts;
    default:
      return state;
  }
  
}

export default combineReducers({user, posts, filter, push});
