import React, { Component, PropTypes } from 'react';
import './_search-bar.sass';
import CheckBox from '../../../../components/checkbox/checkbox';
import InputField from '../../../../components/input-field/input-field';
import Button from '../../../../components/button/button';


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.checkboxClick = this.checkboxClick.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
  }

  searchButtonClicked() {
    const { searchRequest } = this.props;
    searchRequest('hello');
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
          <InputField placeholderText="Search"/>
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

