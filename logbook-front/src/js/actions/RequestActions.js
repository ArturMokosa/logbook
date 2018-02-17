export const FULFILLED = '_FULFILLED';
export const REJECTED = '_REJECTED';

export function startRequest(type) {
    return {
        type: type
    };
};

export function endRequestWithSuccess(response, type) {
    return {
        type: type + FULFILLED,
        payload: response.data
    };
};

export function endRequestWithError(error, type) {
    return {
        type: type + REJECTED,
        payload: error
    };
};