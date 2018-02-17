import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import {
    Form, FormGroup, FormControl, Alert,
    Grid, Row, Col, Button, Checkbox, ControlLabel,
} from 'react-bootstrap';
import { LS_LOGIN_INFO, fetchUserInfo } from '../reducers/LoginReducer';

// #region config
const inputTypes = {
    EMAIL: {
        value: 'email',
        label: 'email'
    },
    PASS: {
        value: 'password',
        label: 'hasło'
    }
}

const styles = {
    loginPage: {
        marginTop: '80px'
    },
    heightFix: {
        bottom: '0'
    }
};

// #endregion

const mapStateToProps = (state) => {
    return {
        error: state.login.error,
        user: state.login.user,
        fetched: state.login.fetched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo: (email, password) => dispatch(fetchUserInfo(email, password))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        const { email, password } = this.state;
        const { error, user, fetched } = this.props;
        const disable = (email.length > 0 && password.length > 0) ? false : true;
        const validState = error ? 'error' : null;

        if (fetched) {
            location.reload();
        };

        return (
            <Grid style={styles.loginPage}>
                <Row>
                    <Col xs={12} md={8}>
                        <Form horizontal onSubmit={this._handleSubmit}>
                            <InputField type={inputTypes.EMAIL} onChange={this._handleChange}
                                value={email} validationState={validState} />
                            <InputField type={inputTypes.PASS} onChange={this._handleChange}
                                value={password} validationState={validState} />
                            <Options />
                            <LoginMessage error={error ? error.message : ''} display={error} />
                            <SubmitButton disabled={disable} />
                        </Form>
                    </Col>
                </Row>
            </Grid >
        );
    }

    _validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    _handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    _handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const state = this.state;
            this.props.fetchUserInfo(state.email, state.password);
        } catch (err) {
            console.error(err);
        }
    }
}

// #region local components

function InputField(props) {
    const type = props.type;
    return (
        <FormGroup controlId={type.value} validationState={props.validationState}>
            <Col componentClass={ControlLabel} sm={2}>
                {type.label}
            </Col>
            <Col sm={10}>
                <FormControl type={type.value} placeholder={type.label}
                    onChange={props.onChange} value={props.value} />
            </Col>
        </FormGroup>
    );
}

function Options(props) {
    return (
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
            </Col>
        </FormGroup>
    );
}

function SubmitButton(props) {
    return (
        <FormGroup>
            <Col smOffset={2} sm={10}>
                <Button type="submit" disabled={props.disabled}>Sign in</Button>
            </Col>
        </FormGroup>
    );
}

function LoginMessage(props) {
    if (props.display) {
        return (
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Alert bsStyle={props.type}>
                        <strong>{props.title}</strong> {props.error}
                    </Alert>
                </Col>
            </FormGroup>
        );
    } else {
        return <div />;
    }
}

LoginMessage.defaultProps = {
    display: false,
    type: 'danger',
    error: '',
    title: 'Login Failed!'
};

// #endregion