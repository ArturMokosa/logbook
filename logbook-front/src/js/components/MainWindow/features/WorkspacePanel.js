import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { PageHeader, PanelGroup, Panel } from 'react-bootstrap';
import Systems from './Systems/Systems';
import UserInfo from './UserProfile/UserInfo';
import Reports from './Reports/Reports';
import * as Labels from '../../../labels';

export const Views = {
    SYSTEMS: <Systems />,
    USER_INFO: <UserInfo />,
    REPORTS: <Reports />
};

const mapStateToProps = (state) => {
    return {
        activeView: state.workspace.activeView
    }
}

@connect(mapStateToProps)
export default class WorkspacePanel extends React.Component {
    render() {
        const { activeView } = this.props;
        return (
            <div>
                {this._renderView(activeView)}
            </div>
        );
    }

    _renderView = (view) => {
        return Views[view];
    }
}