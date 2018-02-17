import axios from 'axios';

import { Views } from "../components/MainWindow/features/WorkspacePanel";
import {
    FULFILLED, REJECTED,
    startRequest, endRequestWithSuccess, endRequestWithError
} from '../actions/RequestActions';
import * as Labels from '../labels';
import * as properties from '../properties';

export const REQUEST_NAME = 'GET_USER_INFO';
export const LS_LOGIN_INFO = 'LoginInfo';

const initialState = {
    user: '',
    logged: false,
    fetching: false,
    fetched: false,
    error: null
};


export default (state = initialState, action) => {

    switch (action.type) {
        case REQUEST_NAME:
            return {
                ...state,
                user: null,
                fetching: true,
                fetched: false,
                error: null
            }
        case (REQUEST_NAME + FULFILLED):
            return {
                ...state,
                user: action.payload,
                logged: true,
                fetching: false,
                fetched: true,
                error: null
            }
        case (REQUEST_NAME + REJECTED):
            return {
                ...state,
                fetching: false,
                fetched: false,
                error: action.payload
            }
    }

    return state;
}

export function fetchUserInfo(email, password) {
    const config = {
        headers: {
            email: email
        }
    };
    return dispatch => {
        dispatch(startRequest(REQUEST_NAME));
        return axios.get(properties.REST_SERVER + properties.REST_LOGIN, config)
            .then((response) => {
                localStorage.setItem(LS_LOGIN_INFO, JSON.stringify(response.data));
                dispatch(endRequestWithSuccess(response, REQUEST_NAME));
            })
            .catch((error) => {
                dispatch(endRequestWithError(error, REQUEST_NAME));
                throw error;
            });
    };
};