import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { PageHeader, PanelGroup, Panel, Label, Tabs, Tab } from 'react-bootstrap';
import { SinglePanel, Field, Section } from '../../common/components/partials';
import ItemList from '../../common/components/ItemList';
import * as Labels from '../../../../labels';
import { LS_LOGIN_INFO } from '../../../../reducers/LoginReducer';
import Loader from '../../common/components/Loader';
import { fetchSystems } from '../../../../reducers/systemsReducer';


const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    systems: state.systems.systems,
    fetching: state.systems.fetching,
    fetched: state.systems.fetched,
    error: state.systems.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSystems: (id) => dispatch(fetchSystems(id))
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Systems extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: '',
      showSearchResult: false
    }
  }

  async componentWillMount() {
    try {
      const { user } = this.props;
      await this.props.fetchSystems(user.employeeid);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { systems, fetching } = this.props;
    if (systems) {
      return (
        <div>
          <PageHeader>
            {Labels.SYSTEMS_TITLE}<small>{' spis systemów'}</small>
          </PageHeader>
          <Section>
            <Tab eventKey={1} title="Systemy">
              <ItemList {...this._getItemListProps(systems)} />
            </Tab>
          </Section>
        </div>
      );
    }
    if (fetching) {
      return <Loader type='large' />;
    }

    return <div class='hidden' />;
  }
  // #region local render methods

  _handleChange = (selectedOption) => {
    this.setState({ selectedOption, showSearchResult: !this.state.showSearchResult });
  }

  _mapJsonToOptions = (object) => {
    return object.map(item => {
      const label = (item.id ? item.id : Labels.MISSING_NAME) + ' ' +
        (item.name ? item.name : Labels.MISSING_DESC) + ' ' + (item.administratorName ? item.administratorName : Labels.MISSING_DESC);
      return {
        label: label,
        value: item.id
      }
    });
  }

  _generateItem = (item) => {
    const label = (item.id ? item.id : Labels.MISSING_NAME) + ' ' +
      (item.name ? item.name : Labels.MISSING_DESC) + ' ' +
      (item.administratorName ? item.administratorName : Labels.MISSING_DESC);
    return (
      <SinglePanel id={item.id} key={item.id} eventKey={item.id} heading={label}>
        <Field label={'id'} value={item.id} />
        <Field label={'name'} value={item.name} />
        <Field label={'description'} value={item.description} />
        <Field label={'administratorName'} value={item.administratorName} />
      </SinglePanel>
    );
  }

  _generateItems = (items) => {
    return items.map(item => this._generateItem(item));
  }

  _getSearchBarProps = (items) => {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return {
      name: "item-search",
      value: value,
      onChange: this._handleChange,
      options: this._mapJsonToOptions(items),
    };
  }

  _getSearchResultProps = (items) => {
    const { showSearchResult, selectedOption } = this.state;
    return {
      display: showSearchResult,
      item: showSearchResult ? this._generateItem(items.find(item => item.id == selectedOption.value)) : <div class='hidden' />
    }
  }

  _getItemListProps = (items) => {
    return {
      items: this._generateItems(items),
      searchBarProps: this._getSearchBarProps(items),
      searchResultProps: this._getSearchResultProps(items),
      showSearchResult: this.state.showSearchResult
    }
  }
  // #endregion
}