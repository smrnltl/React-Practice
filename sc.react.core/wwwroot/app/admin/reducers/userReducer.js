import {
    SET_USER, SET_USER_LIST, SET_SEARCH_USER, SET_USER_FORM, SAVE_USER, SET_ROLES, DELETE_USER, TOGGLE_USER_FORM
} from '../actions/actionTypes';

const initialState = {
    currentUser: null,
    users: null,
    filterUser: null,
    editUser: null,
    message: null,
    result: null,
    roles: null,
    deleteUserResult:null,
    errors: null,
    showForm: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload
            }
            break;
        case SET_USER_LIST:
            return {
                ...state,
                users: action.payload
            }
            break;
        case SET_SEARCH_USER:
            return {
                ...state,
                filterUser: action.payload
            }
        case SET_USER_FORM:
            return {
                ...state,
                editUser: action.payload
            }
        case SAVE_USER:
            return {
                ...state,
                result: action.payload
            }
        case SET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                deleteUserResult: action.payload
            }
        case TOGGLE_USER_FORM:
            return {
                ...state,
                showForm: !state.showForm
            }
        default:
            return state
    }
}