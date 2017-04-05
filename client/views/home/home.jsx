import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';

class Home extends Component {
  render() {
    const { role, industries } = this.props;
    return (
      <div>
        { role.Donor ? 
          <Donor industries={industries} />
          : <NonProfit/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    role: auth.role,
    industries: auth.industriesList
  };
}

export default connect(mapStateToProps)(Home);

