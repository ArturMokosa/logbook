import React from "react";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import WorkspacePanel from './MainWindow/features/WorkspacePanel'

const styles = {
    mainWindow: {
        marginTop: '63px'
    },
    heightFix: {
        bottom: '0'
    }
};

export default class MainWindow extends React.Component {
    render() {
        return (
            <Grid style={styles.mainWindow}>
                <Row style={styles.heightFix}>
                    <Col xs={1} sm={4} md={2} lg={2}><Clearfix /></Col>
                    <Col xs={11} sm={8} md={10} lg={10}>
                        <WorkspacePanel />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
