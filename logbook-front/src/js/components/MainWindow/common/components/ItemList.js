import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Grid, Row, Col, Label } from 'react-bootstrap';
import { PageHeader, PanelGroup, Panel } from 'react-bootstrap';
import { SearchBar, SearchResult, Items } from './partials';
import * as Labels from '../../../../labels';
import Loader from './Loader';


const styles = {
  searchBar: {
    margin: '10px 0 10px 0'
  },
  row: {
    marginTop: '10px',
    height: '30px'
  }
}

@connect(store => {
  return {
    store: store
  }
})
export default class ItemList extends React.Component {
  render() {
    const { pageTitle, pageDesc, items, searchBarProps, showSearchResult, searchResultProps } = this.props;
    if (items && items.length > 0) {
      return (
        <div>
          <SearchBar {...searchBarProps} />
          <Items items={items} display={(!showSearchResult)} />
          <SearchResult {...searchResultProps} display={showSearchResult} />
        </div>
      );
    }
    return (
      <div>
        <PageHeader>
          {pageTitle}<small>{pageDesc}</small>
        </PageHeader>
        <Loader type="large" />
      </div>
    )
  }
}

ItemList.propTypes = {
  searchBarProps: PropTypes.object.isRequired,
  searchResultProps: PropTypes.object.isRequired,
  showSearchResult: PropTypes.any.isRequired
};