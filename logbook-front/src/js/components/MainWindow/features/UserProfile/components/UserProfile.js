import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Field } from '../../../common/components/partials';

// #region test rest remove it
const info = {
    "name": "Jan",
    "surname": "kowalski",
    "rightsUser": "Admin",
    "login": "krzysztoff",
    "password": "esl123",
    "email": "mail@gamil.com",
    "description": null,
    "startEvent": null,
    "endEvent": null
}

// #endregion

// #region styles
const styles = {
    container: {
        margin: '20px'
    },
    row: {
        marginTop: '10px',
        height: '30px'
    }
}

// #endregion

const mapStateToProps = (store) => {
    return {
        user: store.login.user
    };
}

@connect(mapStateToProps)
export default class UserProfile extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <Grid style={styles.container}>
                {this._generateFromJson(user)}
            </Grid>
        );
    }

    _generateFromJson = object => {
        return Object.keys(object).map(key =>
            (key === 'password') ?
                null : <Field key={key} label={key} value={object[key]} />);
    }
}
