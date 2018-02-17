import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Grid, Row, Col, PageHeader, Form, FormGroup, ControlLabel, Button, Panel } from 'react-bootstrap';
import { InputField, SubmitButton, SearchBar, SearchField } from '../../../common/components/partials';
import Datetime from 'react-datetime';
import { fetchReports, createReport } from '../../../../../reducers/reportsReducer';
import * as Labels from '../../../../../labels';

// #region local config

var moment = require('moment');

export const inputTypes = {
    SYSTEM_ID: {
        value: 'systemId',
        label: 'System ID'
    },
    TYPE: {
        value: 'eventType',
        label: 'Type'
    },
    OCCURED_AT: {
        value: 'occuredAt',
        label: 'Occured at'
    },
    DETAILS: {
        value: 'eventDetails',
        label: 'Details'
    },
}

const styles = {
    loginPage: {
        marginTop: '0'
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
        createReport: (state, user, id) => createReport(state, user, id)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CreateReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = this._getInitialState();
    }

    render() {
        const { eventDetails, eventType, occuredAt, systemId } = this.state;
        const disable = !(eventDetails && eventType && occuredAt && systemId);
        return (
            <div>
                <PageHeader>
                    <small>{'Dodaj raport'}</small>
                </PageHeader>
                <FormContainer>
                    <Form horizontal onSubmit={this._handleSubmit}>
                        {this._generateInputs(inputTypes)}
                        <SubmitButton disabled={disable} label={'Dodaj'} />
                    </Form>
                </FormContainer>
            </div>
        );
    }

    // #region local methods

    _handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    _handleSelect = (name, option) => {
        this.setState({
            [name]: option.value
        });
    }

    _handleSubmit = async (event) => {
        event.preventDefault();
        const state = this.state;
        const { user, reports } = this.props;
        try {
            await this.props.createReport(state, user, (reports ? reports.length : 0));
        } catch (error) {
            console.error(error);
        } finally {
            await this.props.fetchReports(user.employeeId);
            alert('Utworzono nowy raport!');
            this._clearFields();
        }
    }

    _handleDateChange = object => {
        this.setState({
            occuredAt: object.toLocaleString().substring(0, 10) + ' ' +
                object.toLocaleString().substring(15, 24) + ' CET ' +
                object.toLocaleString().substring(10, 15)
        });
    }

    _clearFields = () => {
        this.setState(this._getInitialState());
    }

    _getInitialState = () => {
        return {
            eventDetails: '',
            eventType: '',
            occuredAt: '',
            systemId: ''
        };
    }

    _generateInputs = object => {
        const state = this.state;
        const { systems } = this.props;
        return Object.keys(object).map(key => {
            const type = object[key];
            const inputProps = {
                type,
                value: state[type.value],
                onChange: this._handleChange,
            };
            switch (type) {
                case inputTypes.OCCURED_AT:
                    const DatePickerProps = {
                        onChange: this._handleDateChange,
                        value: state.occuredAt,
                        type: type
                    };
                    return <DatePicker key={type.value} {...DatePickerProps} />;
                case inputTypes.SYSTEM_ID:
                    const SystemIdProps = {
                        label: inputTypes.SYSTEM_ID.label,
                        name: inputTypes.SYSTEM_ID.value,
                        value: state[inputTypes.SYSTEM_ID.value],
                        onChange: (option) => this._handleSelect(inputTypes.SYSTEM_ID.value, option),
                        options: this._mapJsonToOptions(systems),
                    };
                    return <SearchField key={1} {...SystemIdProps} />;
                case inputTypes.TYPE:
                    const TypeProps = {
                        label: inputTypes.TYPE.label,
                        name: inputTypes.TYPE.value,
                        value: state[inputTypes.TYPE.value],
                        onChange: (option) => this._handleSelect(inputTypes.TYPE.value, option),
                        options: this._getTypeOptions(),
                    };
                    return <SearchField key={2} {...TypeProps} />;
                default:
                    return <InputField key={type.value} {...inputProps} />;
            }
        });
    }

    _mapJsonToOptions = (object) => {
        return object.map(item => {
            const label = (item.id ? item.id : Labels.MISSING_NAME) + ' ' +
                (item.name ? item.name : Labels.MISSING_DESC);
            return {
                label: label,
                value: item.id
            }
        });
    }

    _getTypeOptions = () => {
        return ['INFO', 'RESTART', 'UPDATE', 'ERROR'].map(item => {
            return {
                label: item,
                value: item
            }
        });
    }

    // #endregion
}

function FormContainer(props) {
    return (
        <Grid style={styles.loginPage}>
            <Row>
                <Col xs={12} md={10}>
                    {props.children}
                </Col>
            </Row>
        </Grid>
    );
}

function DatePicker(props) {
    const dateTimeProps = {
        dateFormat: 'YYYY-MM-DD',
        // timeFormat: false,
        open: true,
        input: false,
        onChange: props.onChange
    };
    const type = props.type;
    return (
        <FormGroup controlId={type.value} validationState={props.validationState}>
            <ControlLabel>{type.label}</ControlLabel>
            <Panel id="select-date">
                <Panel.Heading>
                    <Panel.Title toggle>
                        {props.value ? props.value : 'Wybierz datę...'}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <Datetime {...dateTimeProps} />
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        </FormGroup>
    );
}