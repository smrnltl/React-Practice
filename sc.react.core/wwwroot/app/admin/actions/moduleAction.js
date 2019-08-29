import { SET_MODULE, TOGGLE_ROLE_FORM, SET_MESSAGE } from './actionTypes';
import axios from 'axios';

export const getAllModules = () => dispatch => {
    axios
        .get("/modulemanagement/api/getallmodules")
        .then(res => {
            dispatch({ type: SET_MODULE, payload: res.data });
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

export const getRolePermissionById = (roleId) => dispatch => {
    axios
        .get(`/modulemanagement/api/GetRolePermission?roleId=${roleId}`)
        .then(res => {
            dispatch({ type: SET_MODULE, payload: res.data });
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

export const getModuleRoles = () => dispatch => {
    axios
        .get(`/modulemanagement/api/GetRoles`)
        .then(res => {
            dispatch({ type: SET_MODULE, payload: res.data });
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

export const toogleFrom = () => dispatch => {
    dispatch({
        type: TOGGLE_ROLE_FORM
    });
};

export const saveRolePermission = (data) => dispatch => {
    let url = '/modulemanagement/api/saveRolePermission';
    axios
        .post(url, { rolePermissions: data })
        .then(res => {
            if (res.data.isDbSuccess) {
                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'success',
                        msg: res.data.dbMessage
                    }
                });

                dispatch({
                    type: TOGGLE_ROLE_FORM                    
                });

            }
            else {
                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'err',
                        msg: res.data.dbMessage
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
};