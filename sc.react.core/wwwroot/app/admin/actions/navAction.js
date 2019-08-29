import { SET_PAGENAME } from './actionTypes';

export const setPageName = (pageName) => dispatch => {
    dispatch({ type: SET_PAGENAME, payload: pageName });
}