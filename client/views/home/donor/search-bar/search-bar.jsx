import React, { Component, PropTypes } from 'react';
import './_search-bar.sass';
import CheckBox from '../../../../components/checkbox/checkbox';
import InputField from '../../../../components/input-field/input-field';
import Button from '../../../../components/button/button';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.checkboxClick = this.checkboxClick.bind(this);
  }

  checkboxClick(e) {
    console.log(e.target.id);
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

export default SearchBar;