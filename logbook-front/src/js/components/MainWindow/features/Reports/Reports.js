import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { PageHeader, PanelGroup, Panel, Label, Tabs, Tab, Well } from 'react-bootstrap';
import { SinglePanel, Field, Section, Comment } from '../../common/components/partials';
import ItemList from '../../common/components/ItemList';
import * as Labels from '../../../../labels';
import Loader from '../../common/components/Loader';
import { fetchReports } from "../../../../reducers/reportsReducer";
import CreateReport from './components/CreateReport';
import AddComment from './components/AddComment';

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    reports: state.reports.reports,
    fetching: state.reports.fetching,
    fetched: state.reports.fetched,
    error: state.reports.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReports: (id) => dispatch(fetchReports(id))
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Reports extends React.Component {
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
      await this.props.fetchReports(user.employeeid);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { reports, fetching } = this.props;

    if (reports) {
      return (
        <div>
          <PageHeader>
            {Labels.REPORTS_TITLE}<small>{' spis raportów'}</small>
          </PageHeader>
          <Section>
            <Tab eventKey={1} title="Raporty">
              {(reports.length) ?
                <ItemList {...this._getItemListProps(this._parseReports(reports))} />
                :
                <PageHeader><small>{Labels.REPORTS_EMPTY}</small></PageHeader>}
            </Tab>
            <Tab eventKey={2} title="Dodaj raport">
              <CreateReport />
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

  _parseReports = (reports) => {
    return Object.keys(reports).map(item => {
      return {
        applicantName: reports[item].applicantName,
        createdAt: reports[item].createdAt,
        eventType: reports[item].eventType,
        id: reports[item].id,
        occuredAt: reports[item].occuredAt,
        systemName: reports[item].systemName,
        annotations: reports[item].annotations
      };
    });
  }

  _handleChange = (selectedOption) => {
    this.setState({ selectedOption, showSearchResult: !this.state.showSearchResult });
  }

  _mapJsonToOptions = (object) => {
    return object.map(item => {
      const label = (item.id ? item.id : Labels.MISSING_NAME) + ' ' +
        (item.systemName ? item.systemName : Labels.MISSING_DESC) + ' ' +
        (item.applicantName ? item.applicantName : Labels.MISSING_DESC) + ' ' +
        (item.createdAt ? item.createdAt : Labels.MISSING_DESC);
      return {
        label: label,
        value: item.id
      }
    });
  }

  _generateItem = (item) => {
    const { reports } = this.props;
    const label = (item.id ? item.id : Labels.MISSING_NAME) + ' ' +
      (item.systemName ? item.systemName : Labels.MISSING_DESC) + ' ' +
      (item.applicantName ? item.applicantName : Labels.MISSING_DESC) + ' ' +
      (item.createdAt ? item.createdAt : Labels.MISSING_DESC);
    return (
      <SinglePanel id={item.id} key={item.id} eventKey={item.id} heading={label}>
        <Field label={'id'} value={item.id} />
        <Field label={'systemName'} value={item.systemName} />
        <Field label={'applicantName'} value={item.applicantName} />
        <Field label={'eventType'} value={item.eventType} />
        <Field label={'occuredAt'} value={item.occuredAt} />
        <Field label={'createdAt'} value={item.createdAt} />
        <h2>{'Comments'}</h2>
        {console.log(reports.find(report => report.id === item.id))}
        {this._generateComments(reports.find(report => report.id === item.id).annotations)}
        <AddComment reportId={item.id} />
      </SinglePanel>
    );
  }

  _generateComment = (comment, id) => {
    const props = {
      key: id,
      applicantName: comment.applicantName,
      createdAt: comment.createdAt,
      eventDetails: comment.eventDetails
    };
    return (
      <Comment {...props} />
    );
  }

  _generateItems = (items) => {
    return items.map(item => this._generateItem(item));
  }

  _generateComments = (comments) => {
    return comments.map((comment, id) => this._generateComment(comment, id));
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