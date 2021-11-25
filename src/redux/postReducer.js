import { postState } from "./initState";
import * as actions from "./actionTypes";

function postReducer(state = postState, action) {
    switch (action.type) {
        case actions.START:
            return state;
        case actions.FETCH_POST_REQUEST:
            return { ...state, loading: true }
        case actions.FETCH_POST_SUCCESS:
            return { loading: false, post: action.payload.post, error: '', nest: "succes" }
        case actions.FETCH_POST_FAILURE:
            return { loading: false, post: [], error: action.payload.err }
        case actions.EDIT_POST:
            let post = state.post.data.find(x => x.id == action.payload.post.id);
            let br = state.post.data.findIndex(x => x.id == post.id);
            let tgg = state.post.data[br] = action.payload.post;
            return { ...state, tgg };
        case actions.ADD_COMM:
            let postCom = state.post.data.find(x => x.id == action.payload.comment.id);
            let brComm = state.post.data.findIndex(x => x.id == postCom.id);
            let tggComm = state.post.data[brComm] = action.payload.comment;
            return { ...state, tggComm };
        case actions.ADD_NEW_POST:
            let postd = state.post.data = [...state.post.data,action.payload.newPost];
            return {...state,postd};
        default: return state;
    }
}

export default postReducer;