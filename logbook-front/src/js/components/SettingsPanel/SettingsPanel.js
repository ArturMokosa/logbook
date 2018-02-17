import React from "react";
import { connect } from 'react-redux';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import { Glyphicon } from 'react-bootstrap';
import * as Labels from '../../labels';
import { setActivePanel } from '../../reducers/workspaceReducer';
import { DEFAULT_VIEW } from "../../properties";

const styles = {
  settingsPanel: {
    position: "fixed",
    top: '0',
    bottom: '0',
    marginTop: '52px',
    background: '#f5f5f5',
    padding: '0'
  }
}

const mapStateToProps = (state) => {
  return {
    activeView: state.workspace.activeView
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePanel: (id, parent) => dispatch(setActivePanel(id, parent))
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsPanel extends React.Component {
  render() {
    return (
      <div style={styles.settingsPanel} class="col-xs-1 col-sm-4 col-md-2 col-lg-2">
        <SideNav {...this._getSideNavProps()}>
          <Nav id={Labels.USER_INFO}>
            <NavIcon><Glyphicon glyph="user" /></NavIcon>
            <NavText class="hidden-xs">{Labels.SIDENAV_USER_INFO}</NavText>
          </Nav>
          <Nav id={Labels.SYSTEMS}>
            <NavIcon><Glyphicon glyph="hdd" /></NavIcon>
            <NavText class="hidden-xs">{Labels.SIDENAV_SYSTEMS}</NavText>
          </Nav>
          <Nav id={Labels.REPORTS}>
            <NavIcon><Glyphicon glyph="pencil" /></NavIcon>
            <NavText class="hidden-xs">{Labels.SIDENAV_REPORTS}</NavText>
          </Nav>
        </SideNav>
      </div>
    );
  }

  _getSideNavProps = () => {
    return {
      highlightColor: '#3e3f3a',
      highlightBgColor: '#dfd7ca',
      hoverColor: '#98978b',
      hoverBgColor: '#dfd7ca',
      defaultSelected: DEFAULT_VIEW,
      onItemSelection: (id, parent) => this._setActivePanel(id, parent)
    };
  }

  _setActivePanel(id, parent) {
    this.props.setActivePanel(id, parent);
  }
}
