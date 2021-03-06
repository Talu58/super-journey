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
    const { fetchAllOrganizations, allOrganizationsResults } = this.props;
    fetchAllOrganizations(allOrganizationsResults);
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
    const { industries, userMatchesDisplayed, userFirstname } = this.props;
    return (
      <div className="search-bar-container">
        <div>
          <p className="search-bar-welcome-message">Welcome {userFirstname}!</p>
        </div>
         <div className="filter-main-actions-container">
          <p className="search-bar-category-header" >Select your view:</p>
          <section className="filter-main-sub-container">
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
          </section>
        </div>
        <section className="search-container">
          <p className="search-bar-category-header" >Search:</p>
          <section className="search-sub-container">
            <InputField
              containerStyleClassName="search-bar-input-field"
              placeholderText="Search"
              changeHandler={this.searchbarChange}
              value={this.state.searchbarValue}
            />
            { this.state.searchIsEmpty ? 
              <p className="search-error-message">* Search field required</p>
              : <p className="search-error-message"></p>
            }
            <Button
              value="Search"
              styleClassName="button-primary"
              clickHandler={this.searchButtonClicked}
            />
          </section>
        </section>
        <section className="filter-container">
          <p className="search-bar-category-header" >Filters:</p>
          <section className="checkboxes-container">
            {industries.map(({ value, checked }) => {
              const formattedValue = value.replace(/\s/g, '').toLowerCase();
              return (
                <CheckBox
                  id={value}
                  key={value}
                  label={value}
                  checked={checked}
                  changeHandler={this.checkboxClick}
                  containerStyleClassName={`search-bar-checkbox-container-${formattedValue} search-bar-checkbox-container`}
                />
              );
            })}
          </section>
        </section>
      </div>
    );
  }
};

SearchBar.propTypes = {
  userFirstname: PropTypes.string,
  fetchAllOrganizations: PropTypes.func.isRequired,
  fetchUserMatches: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  searchCheckboxClicked: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  allOrganizationsResults: PropTypes.array.isRequired,
  userMatchesDisplayed: PropTypes.bool.isRequired
};
