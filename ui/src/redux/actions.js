import {REGISTER_ACTION, LOGIN_ACTION, ADD_POST_ACTION, INCOMING_POST_ACTION, FILTER_ACTION} from './actionTypes';

function incomingPost(posts) {
    return {
        type: INCOMING_POST_ACTION,
        payload: posts
    }
}

export function filter(filter) {
    return {
        type: FILTER_ACTION,
        payload: filter
    }
}

export function fetchPosts(options = {}) {
    return dispatch => {
        
        if (options.tag) {
            return fetch(`http://localhost:8080/posts/tags/${options.tag.split('#')[1]}`)
            .then(response => response.json())
            .then(json => dispatch(incomingPost(json)))
        } else if (options.author) {
            return fetch(`http://localhost:8080/posts/author/${options.author}`)
            .then(response => response.json())
            .then(json => dispatch(incomingPost(json)))
        } else {
            return fetch(`http://localhost:8080/posts`)
            .then(response => response.json())
            .then(json => dispatch(incomingPost(json)))
        }

        
      }
}

export function register(userName, password) {
    return {
        type: REGISTER_ACTION,
        payload: {
            username:userName,
            password:password
        }
    }
}

export function login(userName, password) {
    return {
        type: LOGIN_ACTION,
        payload: {
            username:userName,
            password:password
        }
    }
}

export function post(author, text) {
    return {
        type: ADD_POST_ACTION,
        payload: {
            author, text
        }
    }
}