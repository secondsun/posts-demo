import {REGISTER_ACTION, LOGIN_ACTION} from './actionTypes';

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