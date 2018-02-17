import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { PageHeader, Tabs, Tab } from 'react-bootstrap';
import UserProfile from './components/UserProfile';
import { Section } from '../../common/components/partials';


@connect((store) => {
    return {
        activeView: store.workspace.activeView
    };
})
export default class UserInfo extends React.Component {
    render() {
        return (
            <div>
                <PageHeader>
                    Profil <small>informacje o użytkowniku</small>
                </PageHeader>
                <Section>
                    <Tab eventKey={1} title="Podstawowe dane">
                        <UserProfile />
                    </Tab>
                    {/* <Tab eventKey={2} title="Edytuj profil">
                        {'Sorry this front-end section is not created yet!'}
                    </Tab> */}
                </Section>
            </div>
        );
    }
}