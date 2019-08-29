import {
    SET_ROLES, DELETE_ROLE, TOGGLE_ROLE_FORM, SET_ROLE_FORM
} from '../actions/actionTypes';

const initialState = {
    errors: null,
    showForm: false,
    deleteRoleResult: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        case DELETE_ROLE:
            return {
                ...state,
                deleteRoleResult: action.payload
            }
        case TOGGLE_ROLE_FORM:
            return {
                ...state,
                showForm: !state.showForm
            }
        case SET_ROLE_FORM:
            return {
                ...state,
                editRole: action.payload
            }
        default:
            return state
    }
}