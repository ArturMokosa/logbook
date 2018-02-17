import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Grid, Row, Col, PageHeader, Form, FormGroup, FormContainer, ControlLabel, Button, Panel } from 'react-bootstrap';
import { InputArea, SubmitButton, SearchBar, SearchField } from '../../../common/components/partials';
import Datetime from 'react-datetime';
import { fetchReports, addComment } from '../../../../../reducers/reportsReducer';
import * as Labels from '../../../../../labels';

// #region local config

var moment = require('moment');

export const inputTypes = {
    DETAILS: {
        value: 'eventDetails',
        label: 'Comment details'
    },
}

const styles = {
    form: {
        marginLeft: '15px',
        marginRight: '15px'
    }
};

// #endregion

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        reports: state.reports.reports,
        systems: state.systems.systems,
        fetching: state.systems.fetching,
        fetched: state.systems.fetched,
        error: state.systems.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReports: (id) => dispatch(fetchReports(id)),
        addComment: (report, user) => dispatch(addComment(report, user))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();
    }

    render() {
        const { eventDetails } = this.state;
        const { reportId, reports } = this.props;
        const disable = !(eventDetails);
        if (reports) {
            return (
                <Row style={styles.row}>
                    <Col md={12}>
                        <h4>{'Add comment'}</h4>
                        <div style={styles.form}>
                            <Form horizontal onSubmit={this._handleSubmit}>
                                {this._generateInputs(inputTypes)}
                                <SubmitButton disabled={disable} label={'Add'} />
                            </Form>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            return <div class='hidden' />
        }

    }

    // #region local methods

    _getInitialState = () => {
        const { reportId, user } = this.props;
        return {
            eventDetails: '',
            reportId: reportId,
            applicantId: user.employeeId
        };
    }

    _handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    _handleSubmit = async (event) => {
        event.preventDefault();
        const state = this.state;
        const { user } = this.props;
        try {
            console.log(state, user);
            await this.props.addComment(state, user);
        } catch (error) {
            console.error(error);
        } finally {
            await this._clearFields();
        }
    }

    _generateInputs = object => {
        const state = this.state;
        return Object.keys(object).map(key => {
            const type = object[key];
            const inputProps = {
                type,
                value: state[type.value],
                onChange: this._handleChange,
            };
            switch (type) {
                default:
                    return <InputArea key={type.value} {...inputProps} rows="10" />;
            }
        });
        return <div />;
    }

    _clearFields = () => {
        this.setState(this._getInitialState());
    }

    // #endregion
}