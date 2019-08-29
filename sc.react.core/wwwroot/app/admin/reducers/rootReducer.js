import { combineReducers } from 'redux';
import userReducer from './userReducer';
import navReducer from './navReducer';
import roleReducer from './roleReducer';
import uiReducer from './uiReducer';
import moduleReducer from './moduleReducer';
import organizationReducer from './organizationReducer'

const reducers = {
    user: userReducer,
    nav: navReducer,
    role: roleReducer,
    ui: uiReducer,
    module: moduleReducer,
    organization: organizationReducer
}

export default combineReducers(reducers);