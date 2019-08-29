import { SET_MESSAGE, CLEAR_MESSAGE } from './actionTypes';

export const setMessage = (msg) => dispatch => {
    dispatch({ type: SET_MESSAGE, payload:msg });
};

export const clearMessage = (id) => dispatch => {
    dispatch({ type: CLEAR_MESSAGE, payload:id });
};
