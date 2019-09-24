import {
  REGISTER_ACTION,
  LOGIN_ACTION,
  REGISTER_WEB_PUSH,
  INCOMING_POST_ACTION,
  FILTER_ACTION
} from "./actionTypes";

import aerogear from '../AeroGearService'
import base64 from 'base-64'

/**
 * urlBase64ToUint8Array
 * 
 * @param {string} base64String a public vavid key
 */
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function registerWebPush(enable) {
  return (dispatch, getState) => {
    
    return aerogear.register().then(ignore=> {
      return dispatch( {
        type: REGISTER_WEB_PUSH,
        payload: { enabled: true }
      });
    }).catch(err => {
      console.log(err)
      return dispatch( {
        type: REGISTER_WEB_PUSH,
        payload: { enabled: false }
      });
    })
  };
}

function incomingPost(posts) {
  return {
    type: INCOMING_POST_ACTION,
    payload: posts
  };
}

export function filter(filter) {
  return {
    type: FILTER_ACTION,
    payload: filter
  };
}

export function post(author, text) {
  return (dispatch, getState) => {
    return fetch("http://localhost:8080/posts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ author, text })
    }).then(ignore => {
      const currentFilter = getState().filter;
      if (currentFilter.startsWith("#")) {
        dispatch(fetchPosts({ tag: currentFilter }));
      } else if (currentFilter.length == 0) {
        dispatch(fetchPosts());
      } else {
        dispatch(fetchPosts({ author: currentFilter }));
      }
    });
  };
}

export function fetchPosts(options = {}) {
  return dispatch => {
    if (options.tag) {
      return fetch(
        `http://localhost:8080/posts/tags/${options.tag.split("#")[1]}`
      )
        .then(response => response.json())
        .then(json => dispatch(incomingPost(json)));
    } else if (options.author) {
      return fetch(`http://localhost:8080/posts/author/${options.author}`)
        .then(response => response.json())
        .then(json => dispatch(incomingPost(json)));
    } else {
      return fetch(`http://localhost:8080/posts`)
        .then(response => response.json())
        .then(json => dispatch(incomingPost(json)));
    }
  };
}

export function register(userName, password) {
  return {
    type: REGISTER_ACTION,
    payload: {
      username: userName,
      password: password
    }
  };
}

export function login(userName, password) {
  return {
    type: LOGIN_ACTION,
    payload: {
      username: userName,
      password: password
    }
  };
}
