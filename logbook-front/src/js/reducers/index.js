import { combineReducers } from "redux";

import workspace from './workspaceReducer';
import login from './LoginReducer';
import systems from './systemsReducer';
import reports from './reportsReducer';

export default combineReducers({
    workspace,
    login,
    systems,
    reports
})
