import {SET_ORGANIZATION_LIST, SET_ORGANIZATION_FORM, SAVE_ORGANIZATION, DELETE_ORGANIZATION, SET_MESSAGE, TOGGLE_ORGANIZATION_FORM } from './actionTypes';
import axios from 'axios';
import store from '../store';

export const getOrganizations = (pageNo, pagePerDisplay, itemsPerPage) => dispatch => {
    let data = 'pageNo=' + pageNo + '&pagePerDisplay=' + pagePerDisplay + '&itemsPerPage=' + itemsPerPage;
    axios
        .get("/OrganizationManagement/api/getorganizations?" + data)
        .then(res => {
            dispatch({ type: SET_ORGANIZATION_LIST, payload: res.data });
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

export const getOrganizationById = (id) => dispatch => {
    if (id === null) id = 0;
    let data = 'id=' + id;
    axios
        .get("/OrganizationManagement/api/getorganizationbyid?" + data)
        .then(res => {
            dispatch({ type: SET_ORGANIZATION_FORM, payload: res.data });
            dispatch({ type: TOGGLE_ORGANIZATION_FORM });
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


export const saveOrganization = (organization) => dispatch => {
    let url = "/OrganizationManagement/api/saveorganization";
    
    axios
        .post(url, organization)
        .then(res => {
            dispatch({ type: SAVE_ORGANIZATION, payload: res.data });
            if (res.data.isDbSuccess) {
                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'success',
                        msg: res.data.dbMessage
                    }
                });

                let pager = store.getState().organization.organizations.pager;

                dispatch(getOrganizations(pager.pageNo, pager.pagePerDisplay, pager.itemsPerPage));

                dispatch({ type: TOGGLE_ORGANIZATION_FORM });
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

//export const getRoles = () => dispatch => {
//    axios
//        .get("/RoleManagement/api/getroles")
//        .then(res => {
//            dispatch({ type: SET_ROLES, payload: res.data })
//        })
//        .catch(err => {
//            dispatch({
//                type: SET_MESSAGE,

//                payload: {
//                    type: 'error',
//                    msg: err
//                }
//            });
//        })
//}


export const deleteOrganization = (id) => dispatch => {
    if (id === null) id = 0;
    let data = 'id=' + id;

    axios
        .get("/OrganizationManagement/api/deleteorganization?" + data)
        .then(res => {
            dispatch({ type: DELETE_ORGANIZATION, payload: res.data });

            if (res.data.isDbSuccess) {
                dispatch({
                    type: SET_MESSAGE,
                    payload: {
                        type: 'success',
                        msg: res.data.dbMessage
                    }
                });

                let pager = store.getState().organization.organizations.pager;

                dispatch(getOrganizations(pager.pageNo, pager.pagePerDisplay, pager.itemsPerPage));
            }

            else {

                dispatch({
                    type: SET_MESSAGE,

                    payload: {
                        type: 'error',
                        msg: 'Could not delete organization.'
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

export const toggleOrganizationForm = () => dispatch => {
    dispatch({ type: TOGGLE_ORGANIZATION_FORM })
}