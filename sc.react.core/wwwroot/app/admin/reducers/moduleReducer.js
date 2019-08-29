import {
    SET_MODULE, TOGGLE_ROLE_FORM
} from '../actions/actionTypes';

const initialState = { showForm: false, modules :[]}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MODULE:
            return {
                ...state,
                modules: action.payload,
                showForm:true
            }
            break;
        case TOGGLE_ROLE_FORM:
            return {
                ...state,
                showForm: !state.showForm
            }
            break;
        default:
            return state
    }
}