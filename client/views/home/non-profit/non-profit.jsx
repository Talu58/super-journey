import React, { Component, PropTypes } from 'react';
import './_non-profit.sass';

class NonProfit extends Component {
  render() {
    const { organization } = this.props;
    console.log('NonProfit organization', organization);
    return (
      <div>
        NonProfit
      </div>
    );
  }
}

NonProfit.propTypes = {

};

export default NonProfit;