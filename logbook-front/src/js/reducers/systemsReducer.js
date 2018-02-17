import axios from 'axios';
import { Views } from "../components/MainWindow/features/WorkspacePanel";
import {
    FULFILLED, REJECTED,
    startRequest, endRequestWithSuccess, endRequestWithError
} from '../actions/RequestActions';
import * as Labels from '../labels';
import * as properties from '../properties';

export const REQUEST_NAME = 'GET_SYSTEMS';

const initialState = {
    systems: null,
    fetching: false,
    fetched: false,
    error: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case REQUEST_NAME:
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        case (REQUEST_NAME + FULFILLED):
            return {
                ...state,
                systems: action.payload,
                fetching: false,
                fetched: true
            };
        case (REQUEST_NAME + REJECTED):
            return {
                ...state,
                systems: null,
                fetching: false,
                fetched: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export function fetchSystems(id) {
    const config = {
        params: {
            applicant: id
        }
    }
    return dispatch => {
        dispatch(startRequest(REQUEST_NAME));
        return axios.get(properties.REST_SERVER + properties.REST_SYSTEMS, config)
            .then((response) => {
                dispatch(endRequestWithSuccess(response, REQUEST_NAME));
            })
            .catch((error) => {
                dispatch(endRequestWithError(error, REQUEST_NAME));
                throw error;
            });
    };
};
