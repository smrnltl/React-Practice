import { SET_USER, SET_SEARCH_USER, SET_USER_LIST, SET_USER_FORM, SAVE_USER, SET_ROLES, DELETE_USER, SET_MESSAGE, TOGGLE_USER_FORM } from './actionTypes';
import axios from 'axios';
import store from '../store';

export const getUser = () => dispatch => {
    axios
        .get("/usermanagement/api/getcurrentuser")
        .then(res => {
            dispatch({ type: SET_USER, payload: res.data });
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        });
};

export const getUsers = (userName, email, phoneNumber, pageNo, pagePerDisplay, itemsPerPage) => dispatch => {
    let data = 'userName=' + userName + '&email=' + email + '&phoneNumber=' + phoneNumber + '&pageNo=' + pageNo + '&pagePerDisplay=' + pagePerDisplay + '&itemsPerPage=' + itemsPerPage;
    axios
        .get("/UserManagement/api/getusers?" + data)
        .then(res => {
            dispatch({ type: SET_USER_LIST, payload: res.data });
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        })
}

export const searchUser = (userName, email, phoneNumber, pageNo, pagePerDisplay, itemsPerPage) => dispatch => {
    let data = 'userName=' + userName + '&email=' + email + '&phoneNumber=' + phoneNumber + '&pageNo=' + pageNo + '&pagePerDisplay=' + pagePerDisplay + '&itemsPerPage=' + itemsPerPage;
    axios
        .get("/UserManagement/api/getusers?" + data)
        .then(res => {
            dispatch({ type: SET_USER_LIST, payload: res.data });
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        });
};

export const getUserById = (userId) => dispatch => {
    let data = 'userId=' + userId;
    axios
        .get("/UserManagement/api/getuserbyid?" + data)
        .then(res => {
            dispatch({ type: SET_USER_FORM, payload: res.data });
            dispatch({ type: TOGGLE_USER_FORM });
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        });
};


export const saveUser = (user) => dispatch => {
    const userid = user.userId;

    let url = '';
    if (userid === '' || userid === null)
        url = "/UserManagement/api/saveuser";
    else
        url = "/UserManagement/api/updateuser";
    axios
        .post(url, user)
        .then(res => {
            dispatch({ type: SAVE_USER, payload: res.data });

            if (res.data.succeeded) {
                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'success',
                        msg: 'User saved successfully'
                    }
                });

                let pager = store.getState().user.users.pager;

                dispatch(getUsers('', '', '', pager.pageNo, pager.pagePerDisplay, pager.itemsPerPage));

                dispatch({ type: TOGGLE_USER_FORM });
            }
            else {
                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'error',
                        msg: res.data.errors
                    }
                });
            }
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        });
}

export const getRoles = () => dispatch => {
    axios
        .get("/RoleManagement/api/getroles")
        .then(res => {
            dispatch({ type: SET_ROLES, payload: res.data })
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        })
}


export const deleteUser = (userId) => dispatch => {
    let data = 'userId=' + userId;

    axios
        .get("/UserManagement/api/deleteuser?" + data)
        .then(res => {
            dispatch({ type: DELETE_USER, payload: res.data });

            if (res.data.isDbSuccess) {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        type: 'success',
                        msg: 'User deleted successfully'
                    }
                });

                let pager = store.getState().user.users.pager;

                dispatch(getUsers('', '', '', pager.pageNo, pager.pagePerDisplay, pager.itemsPerPage));
            }

            else {

                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'error',
                        msg: 'Could not save user.'
                    }
                });
            }
        })
        .catch(err => {
            dispatch({
                type: SET_MESSAGE,

                payload: {
                    type: 'error',
                    msg: err
                }
            });
        })
}

export const toggleUserForm = () => dispatch => {
    dispatch({ type: TOGGLE_USER_FORM })
}