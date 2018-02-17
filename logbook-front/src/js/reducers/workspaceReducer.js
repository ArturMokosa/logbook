import { Views } from "../components/MainWindow/features/WorkspacePanel";
import * as Labels from '../labels';
import * as properties from '../properties';

export const SET_ACTIVE_PANEL = 'SET_ACTIVE_PANEL';
export const SET_ACTIVE_PANEL_ERROR = 'SET_ACTIVE_PANEL_REJECTED';

const initialState = {
    activeView: properties.DEFAULT_VIEW,
    error: null,
}

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_ACTIVE_PANEL: {
            return { ...state, activeView: action.payload, error: null }
        }
        case SET_ACTIVE_PANEL_ERROR: {
            return { ...state, activeView: properties.DEFAULT_VIEW, error: null }
        }
    }

    return state;
}

export function setActivePanel(id, parent) {
    return {
        type: SET_ACTIVE_PANEL,
        payload: id
    }
}