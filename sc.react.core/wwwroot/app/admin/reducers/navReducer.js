import { SET_PAGENAME} from '../actions/actionTypes';

const initialState = {
    pageName: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PAGENAME:
            return {
                ...state,
                pageName: action.payload
            }
            break;
        default:
            return state
    }
}