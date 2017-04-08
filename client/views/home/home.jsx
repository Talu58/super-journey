import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';

class Home extends Component {
  render() {
    const { role, industries, matchesResult } = this.props;
    return (
      <div>
        { role.Donor ? 
          <Donor industries={industries} matchesResult={matchesResult} />
          : <NonProfit/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth, search }) => {
  return {
    role: auth.role,
    industries: auth.industriesList,
    matchesResult: search.matches
  };
}

export default connect(mapStateToProps)(Home);

