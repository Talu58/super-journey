import React, { Component, PropTypes } from 'react';
import './_search-bar.sass';
import CheckBox from '../../../../components/checkbox/checkbox';

class SearchBar extends Component {
  render() {
    const { industries } = this.props;
    return (
      <div>
        {industries.map(industry => {
          return <CheckBox key={industry} label={industry} />
        })}
      </div>
    );
  }
}

SearchBar.propTypes = {

};

export default SearchBar;