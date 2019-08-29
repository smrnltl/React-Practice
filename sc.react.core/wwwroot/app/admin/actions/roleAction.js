import { SET_ROLES, DELETE_ROLE, SET_MESSAGE, TOGGLE_ROLE_FORM, SAVE_ROLE, SET_ROLE_FORM } from './actionTypes';
import axios from 'axios';

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

export const deleteRole = (id) => dispatch => {
    let data = 'id=' + id;

    axios
        .get("/RoleManagement/api/deleteRole?" + data)
        .then(res => {
            dispatch({ type: DELETE_ROLE, payload: res.data });

            if (res.data.succeeded) {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        type: 'success',
                        msg: 'Role deleted successfully'
                    }
                });

                dispatch(getRoles());
            }

            else {

                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'error',
                        msg: 'Could not delete role.'
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

export const saveRole = (role) => dispatch => {
    const roleid = role.id;
    let url = '';
    if (roleid === '' || roleid === null)
        url = "/RoleManagement/api/saverole";
    else
        url = "/RoleManagement/api/updaterole";
    axios
        .post(url, role)
        .then(res => {
            dispatch({ type: SAVE_ROLE, payload: res.data });

            if (res.data.succeeded) {
                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'success',
                        msg: 'Role saved successfully'
                    }
                });

                //let pager = store.getState().role.roles.pager;

                dispatch(getRoles());

                dispatch({ type: TOGGLE_ROLE_FORM });
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

export const getRoleById = (roleId) => dispatch => {
    let data = 'roleId=' + roleId;
    axios
        .get("/RoleManagement/api/getrolebyid?" + data)
        .then(res => {
            dispatch({ type: SET_ROLE_FORM, payload: res.data });
            dispatch({ type: TOGGLE_ROLE_FORM });
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

export const toggleRoleForm = () => dispatch => {
    dispatch({ type: TOGGLE_ROLE_FORM });
}