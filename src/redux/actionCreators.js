import * as actionTypes from "./actionTypes";
import axios from "axios";

export const START = () => {
    return {
        type: actionTypes.START
    }
}

export const FETCH_POST = () => {
    return function (dispatch) {
        dispatch(FETCH_POST_REQUEST());
        axios.get('https://dummyapi.io/data/v1/post?limit=10', {
            headers: {
                'app-id': '619ba67f821339c01fca56cc'
            }
        })
            .then(response => {
                dispatch(FETCH_POST_SUCCESS(response.data))
            })
            .catch(error => dispatch(FETCH_POST_FAILURE(error)));
    }
}


export const FETCH_POST_REQUEST = () => {
    return {
        type: actionTypes.FETCH_POST_REQUEST
    }
}

export const FETCH_POST_SUCCESS = (post) => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS,
        payload: {
            post: post
        }
    }
}

export const FETCH_POST_FAILURE = (err) => {
    return {
        type: actionTypes.FETCH_POST_FAILURE,
        payload: {
            err: err
        }
    }
}

export const ADD_COMM = (comm) => {
    return {
        type: actionTypes.ADD_COMM,
        payload: {
            comment: comm
        }
    }
}

export const EDIT_POST = (post) => {
    return {
        type: actionTypes.EDIT_POST,
        payload: {
            post: post
        }
    }
}

export const ADD_NEW_POST = (newPost) => {
    return {
        type: actionTypes.ADD_NEW_POST,
        payload: {
            newPost: newPost
        }
    }
}