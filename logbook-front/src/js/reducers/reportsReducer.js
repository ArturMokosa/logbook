import axios from 'axios';
import { Views } from "../components/MainWindow/features/WorkspacePanel";
import {
    FULFILLED, REJECTED,
    startRequest, endRequestWithSuccess, endRequestWithError
} from '../actions/RequestActions';
import { inputTypes } from '../components/MainWindow/features/Reports/components/CreateReport'
import * as Labels from '../labels';
import * as properties from '../properties';

export const REQUEST_NAME = 'GET_REPORTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const CREATE_REPORT = 'CREATE_REPORT';

const initialState = {
    reports: null,
    fetching: false,
    fetched: false,
    error: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case REQUEST_NAME:
            return {
                ...state,
                reports: true,
                fetched: false,
                error: null
            };
        case (REQUEST_NAME + FULFILLED):
            return {
                ...state,
                reports: action.payload,
                fetching: false,
                fetched: true
            };
        case (REQUEST_NAME + REJECTED):
            return {
                ...state,
                reports: null,
                fetching: false,
                fetched: false,
                error: action.payload
            };
        case CREATE_REPORT:
            return {
                ...state,
                reports: state.reports.concat([action.payload])
            };
        case ADD_COMMENT:
            const comment = action.payload;
            const newReports = Object.keys(state.reports).map(item => {
                const element = state.reports[item];
                if (element.id === comment.id) {
                    return {
                        ...element,
                        annotations: element.annotations.concat([{
                            applicantName: comment.applicantName,
                            createdAt: comment.createdAt,
                            eventDetails: comment.eventDetails
                        }])
                    };
                }
                return element;
            });
            console.log(newReports);
            return {
                ...state,
                reports: newReports
            };
        default:
            return state;
    }

}

export function fetchReports(id) {
    const config = {
        params: {
            applicant: id
        }
    }
    return dispatch => {
        dispatch(startRequest(REQUEST_NAME));
        return axios.get(properties.REST_SERVER + properties.REST_REPORTS, config)
            .then((response) => {
                dispatch(endRequestWithSuccess(response, REQUEST_NAME));
            })
            .catch((error) => {
                dispatch(endRequestWithError(response, REQUEST_NAME));
                throw error;
            });
    };
};

export function createReport(report, user, id) {
    try {
        const config = {
            method: 'POST',
            url: properties.REST_REPORTS,
            baseURL: properties.REST_SERVER,
            data: {
                annotation: {
                    applicantId: user.employeeId,
                    eventDetails: report[inputTypes.DETAILS.value]
                },
                applicantId: user.employeeId,
                eventType: report[inputTypes.TYPE.value],
                occuredAt: report[inputTypes.OCCURED_AT.value],
                systemId: report[inputTypes.SYSTEM_ID.value]
            },
        }

        axios(config)
            .then(response => {
                console.log('CREATE_EVET SUCCESS:', response);
            })
            .catch(error => {
                console.error('CREATE_EVENT ERROR:', error);
                throw error;
            })

    } catch (error) {
        console.log(report, user, id);
        throw error;
    } finally {
        return {
            type: CREATE_REPORT,
            payload: {
                annotations: {
                    applicantName: user.name,
                    createdAt: getCurrentDate(),
                    eventDetails: report[inputTypes.DETAILS.value]
                },
                applicantName: user.name,
                createdAt: getCurrentDate(),
                eventType: report[inputTypes.TYPE.value],
                id,
                occuredAt: report[inputTypes.OCCURED_AT.value],
                systemName: report[inputTypes.SYSTEM_ID.value]
            }
        };
    }
};

export function addComment(report, user) {
    try {
        const config = {
            method: 'PATCH',
            url: properties.REST_REPORTS + `/${report.reportId}`,
            baseURL: properties.REST_SERVER,
            data: {
                applicantId: user.employeeId,
                eventDetails: report[inputTypes.DETAILS.value]
            }
        };

        axios(config)
            .then(response => {
                console.log('COMMENT_ADD SUCCESS:', response);
            })
            .catch(error => {
                console.error('COMMENT_ADD ERROR:', error);
                throw error;
            })

    } catch (error) {
        console.log(report, user);
        throw error;
    } finally {
        return {
            type: ADD_COMMENT,
            payload: {
                id: report.reportId,
                createdAt: getCurrentDate(),
                applicantName: user.name,
                eventDetails: report[inputTypes.DETAILS.value]
            }
        };
    }
};

function getCurrentDate() {
    const currentDate = new Date();
    const date = currentDate.toString().substring(0, 10) + ' ' +
        currentDate.toString().substring(15, 24) + ' CET ' +
        currentDate.toString().substring(10, 15);
    return date;
}