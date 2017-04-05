import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  render() {
    const { industries } = this.props;
    return (
      <div>
        {industries.map(industry => {
          return <p>{industry}</p>
        })}
      </div>
    );
  }
}

SearchBar.propTypes = {

};

export default SearchBar;