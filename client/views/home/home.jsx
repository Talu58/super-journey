import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';

class Home extends Component {
  render() {
    const { role } = this.props;
    return (
      <div>
        { role.Donor ? 
          <Donor/>
          : <NonProfit/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    role: auth.role
  };
}

export default connect(mapStateToProps)(Home);

