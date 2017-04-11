import React, { Component, PropTypes } from 'react';
import './_search-bar.sass';
import CheckBox from '../../../../components/checkbox/checkbox';
import InputField from '../../../../components/input-field/input-field';
import Button from '../../../../components/button/button';


export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchbarValue: '',
      searchIsEmpty: false
    }
    this.seeAllButtonClicked = this.seeAllButtonClicked.bind(this);
    this.seeMyMatchesButtonClicked = this.seeMyMatchesButtonClicked.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
    this.searchbarChange = this.searchbarChange.bind(this);
    this.checkboxClick = this.checkboxClick.bind(this);
  }

  seeAllButtonClicked() {
    const { fetchAllProjects, allProjectsResults } = this.props;
    fetchAllProjects(allProjectsResults);
  }

  seeMyMatchesButtonClicked() {
    const { fetchUserMatches } = this.props;
    fetchUserMatches();
  }

  searchButtonClicked() {
    const { searchRequest } = this.props;
    if (this.state.searchbarValue === '') {
      this.setState({
        searchIsEmpty: true
      });
    } else {
      searchRequest(this.state.searchbarValue);
      this.setState({
        searchIsEmpty: false
      });
    }
  }

  searchbarChange(e) {
    this.setState({
      searchbarValue: e.target.value
    });
  }

  checkboxClick(e) {
    const { searchCheckboxClicked, industries } = this.props;
    searchCheckboxClicked(e.target.id, industries);
  }

  render() {
    const { industries, userMatchesDisplayed } = this.props;
    return (
      <div className="search-bar-container">
         <div className="filter-main-actions-container">
          <Button
            value="My matches"
            containerStyleClassName="button-searchbar-action-container"
            styleClassName="button-searchbar-action"
            clickHandler={this.seeMyMatchesButtonClicked}
            active={userMatchesDisplayed}
          />
          <Button
            value="See All"
            containerStyleClassName="button-searchbar-action-container"
            styleClassName="button-searchbar-action"
            clickHandler={this.seeAllButtonClicked}
            active={!userMatchesDisplayed}
          />
        </div>
        <div className="search-container">
          <p className="search-bar-category-header" >Search:</p>
          <InputField
            placeholderText="Search"
            changeHandler={this.searchbarChange}
            value={this.state.searchbarValue}
          />
          { this.state.searchIsEmpty ? 
            <span className="search-error-message">* Search field required</span>
            : null
          }
          <Button
            value="Search"
            styleClassName="button-primary"
            clickHandler={this.searchButtonClicked}
          />
        </div>
        <div className="filter-container">
          <p className="search-bar-category-header" >Filters:</p>
          <div className="checkboxes-container">
            {industries.map(({ value, checked }) => (
              <CheckBox
                id={value}
                key={value}
                label={value}
                checked={checked}
                changeHandler={this.checkboxClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

SearchBar.propTypes = {
  fetchAllProjects: PropTypes.func.isRequired,
  fetchUserMatches: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  searchCheckboxClicked: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  allProjectsResults: PropTypes.array.isRequired,
  userMatchesDisplayed: PropTypes.bool.isRequired
};
