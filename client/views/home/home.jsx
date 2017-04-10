import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';
import { searchCheckboxClicked, searchRequest, fetchAllProjects } from '../../actions/search/searchActions';
import { getUserInformation } from '../../actions/auth/authActions';
import jwt from 'jsonwebtoken';


class Home extends Component {
  
  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email);
  }

  render() {
    const { role, industries, displayedResults, searchCheckboxClicked, isSearching, homeIsLoading, searchRequest, fetchAllProjects } = this.props;
    
    return (
      <div>
        { homeIsLoading ? <div>Loading</div> :
           role.Donor ? 
            <Donor
              fetchAllProjects={fetchAllProjects}
              industries={industries}
              matchesResult={displayedResults}
              searchCheckboxClicked={searchCheckboxClicked}
              isSearching={isSearching}
              searchRequest={searchRequest}
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
    displayedResults: search.allDisplayedResults,
    isSearching: search.isSearching
  };
}

const matchDispatchToProps = dispatch => bindActionCreators(
  {
    searchCheckboxClicked,
    getUserInformation,
    searchRequest,
    fetchAllProjects
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);

