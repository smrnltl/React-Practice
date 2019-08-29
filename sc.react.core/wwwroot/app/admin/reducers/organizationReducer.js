import {
   SET_ORGANIZATION_LIST, SET_ORGANIZATION_FORM, SAVE_ORGANIZATION, DELETE_ORGANIZATION, TOGGLE_ORGANIZATION_FORM
} from '../actions/actionTypes';

const initialState = {
    organizations: null,
    filterOrganization: null,
    editOrganization: null,
    message: null,
    result: null,
    roles: null,
    deleteOrganizationResult:null,
    errors: null,
    showForm: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ORGANIZATION_LIST:
            return {
                ...state,
                organizations: action.payload
            }
            break;
        case SET_ORGANIZATION_FORM:
            return {
                ...state,
                editOrganization: action.payload
            }
        case SAVE_ORGANIZATION:
            return {
                ...state,
                result: action.payload
            }
        case DELETE_ORGANIZATION:
            return {
                ...state,
                deleteOrganizationResult: action.payload
            }
        case TOGGLE_ORGANIZATION_FORM:
            return {
                ...state,
                showForm: !state.showForm
            }
        default:
            return state
    }
}