import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';
import { searchCheckboxClicked } from '../../actions/search/searchActions';
import { getUserInformation } from '../../actions/auth/authActions';
import jwt from 'jsonwebtoken';


class Home extends Component {
  
  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email);
  }

  render() {
    const { role, industries, matchesResult, searchCheckboxClicked, isSearching, searchResult, homeIsLoading } = this.props;
    
    return (
      <div>
        { homeIsLoading ? <div>Loading</div> :
           role.Donor ? 
            <Donor
              industries={industries}
              matchesResult={isSearching ? searchResult : matchesResult}
              searchCheckboxClicked={searchCheckboxClicked}
              isSearching={isSearching}
            />
            : <NonProfit/>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth, search }) => {
  return {
    role: auth.role,
    homeIsLoading: auth.homeIsLoading,
    industries: search.industriesList,
    matchesResult: search.matches, 
    searchResult: search.searchResult,
    isSearching: search.isSearching
  };
}

const matchDispatchToProps = dispatch => bindActionCreators(
  {
    searchCheckboxClicked,
    getUserInformation
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);

