import React, { Component, PropTypes } from 'react';
import './_search-bar.sass';
import CheckBox from '../../../../components/checkbox/checkbox';
import InputField from '../../../../components/input-field/input-field';
import Button from '../../../../components/button/button';


class SearchBar extends Component {
  render() {
    const { industries } = this.props;
    return (
      <div className="search-bar-container">
        <div className="search-container">
          <InputField placeholderText="Search"/>
          <Button
            value="Search"
            styleClassName="button-primary"
          />
        </div>
        <div className="checkboxes-container">
          {industries.map(industry => {
            return <CheckBox key={industry} label={industry} />
          })}
        </div>
      </div>
    );
  }
}

export default SearchBar;