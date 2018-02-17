import React from "react";
import Select from 'react-select';
import {
    Grid, Row, Col, ListGroup, ListGroupItem, Button,
    PanelGroup, Panel, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';
import * as Labels from '../../../../labels';
import PropTypes from 'prop-types';
import { PageHeader, Tabs, Tab } from 'react-bootstrap';

const styles = {
    searchBar: {
        margin: '10px 0 10px 0'
    },
    row: {
        marginTop: '10px',
        height: '30px'
    },
    comment: {
        color: 'white'
    }
}

export function Field(props) {
    return (
        <Row style={styles.row}>
            <Col xs={2}><h5 class={'text-capitalize'}>{props.label}</h5></Col>
            <Col xs={10}><h4 class={'text-capitalize'}>{props.value}</h4></Col>
        </Row>
    );
}

Field.defaultProps = {
    label: Labels.MISSING_NAME,
    value: Labels.MISSING_DESC
};

export function SearchBar(props) {
    return (
        <Select
            style={styles.searchBar}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
        />
    );
}

export function SearchResult(props) {
    if (props.display) {
        return props.item;
    }
    return <div class='hidden' />;

}

export function Items(props) {
    if (props.display == false) {
        return <div class='hidden' />;
    }
    return (
        <PanelGroup accordion id={1}>
            {props.items}
        </PanelGroup>
    );
}

Items.propTypes = {
    items: PropTypes.any
}

Items.defaultProps = {
    items: Labels.EMPTY_ARRAY
};

export function SinglePanel(props) {
    return (
        <Panel eventKey={props.eventKey}>
            <Panel.Heading>
                <Panel.Toggle>
                    <Panel.Title>{props.heading}</Panel.Title>
                </Panel.Toggle>
            </Panel.Heading>
            <Panel.Body collapsible>
                <Grid style={styles.container}>
                    {props.children}
                </Grid>
            </Panel.Body>
        </Panel>
    );
}

SinglePanel.propTypes = {
    heading: PropTypes.string
}

export function Section(props) {
    return (
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            {props.children}
        </Tabs>
    );
}

export function InputField(props) {
    const type = props.type;
    return (
        <FormGroup bsSize={props.size} controlId={type.value} validationState={props.validationState}>
            <ControlLabel>{type.label}</ControlLabel>
            <FormControl
                type={props.inputType}
                placeholder={type.label}
                value={props.value}
                onChange={props.onChange} />
        </FormGroup>
    );
}

InputField.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.any.isRequired
};

InputField.defaultProps = {
    size: null,
    inputType: 'text',
    type: {
        value: 'input',
        label: ''
    },
    validationState: null
};

export function InputArea(props) {
    const type = props.type;
    return (
        <FormGroup bsSize={props.size} controlId={type.value} validationState={props.validationState}>
            <ControlLabel>{type.label}</ControlLabel>
            <FormControl
                componentClass="textarea"
                type={props.inputType}
                placeholder={type.label}
                value={props.value}
                onChange={props.onChange} />
        </FormGroup>
    );
}

InputArea.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.any.isRequired
};

InputArea.defaultProps = {
    size: null,
    inputType: 'text',
    type: {
        value: 'input',
        label: ''
    },
    validationState: null
};

export function SubmitButton(props) {
    return (
        <FormGroup>
            <Button type="submit" disabled={props.disabled}>{props.label}</Button>
            {props.children}
        </FormGroup>
    );
}

SubmitButton.defaultProps = {
    label: 'Button'
};

export function Comment(props) {
    return (
        <Panel bsStyle="info">
            <Panel.Heading>
                <Panel.Title componentClass="h3"><div style={styles.comment}>{props.applicantName + ' ' + props.createdAt}</div></Panel.Title>
            </Panel.Heading>
            <Panel.Body>{props.eventDetails}</Panel.Body>
        </Panel>
    );
}

export function SearchField(props) {
    return (
        <FormGroup controlId={props.label}>
            <ControlLabel>{props.label}</ControlLabel>
            <SearchBar {...props} />
        </FormGroup>
    );
}