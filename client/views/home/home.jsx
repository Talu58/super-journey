import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';
import { searchCheckboxClicked } from '../../actions/search/searchActions';

class Home extends Component {
  render() {
    const { role, industries, matchesResult, searchCheckboxClicked } = this.props;
    return (
      <div>
        { role.Donor ? 
          <Donor industries={industries} matchesResult={matchesResult} searchCheckboxClicked={searchCheckboxClicked} />
          : <NonProfit/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth, search }) => {
  return {
    role: auth.role,
    industries: search.industriesList,
    matchesResult: search.matches
  };
}

const matchDispatchToProps = dispatch => bindActionCreators({searchCheckboxClicked: searchCheckboxClicked}, dispatch)

export default connect(mapStateToProps, matchDispatchToProps)(Home);

