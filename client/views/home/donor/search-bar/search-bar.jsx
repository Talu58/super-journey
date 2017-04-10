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

    this.checkboxClick = this.checkboxClick.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
    this.searchbarChange = this.searchbarChange.bind(this);
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
    const { industries } = this.props;
    return (
      <div className="search-bar-container">
        <div className="search-container">
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
    );
  }
}

