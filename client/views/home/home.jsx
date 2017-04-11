import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';
import { searchCheckboxClicked, searchRequest, fetchAllProjects, fetchUserMatches } from '../../actions/search/searchActions';
import { getUserInformation } from '../../actions/auth/authActions';
import jwt from 'jsonwebtoken';


class Home extends Component {
  
  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email);
  }

  render() {
    const { role, industries, displayedResults, searchCheckboxClicked, isFiltering, homeIsLoading, searchRequest, fetchAllProjects, fetchUserMatches, allProjectsResults, userMatchesDisplayed, industriesList } = this.props;
    return (
      <div>
        { homeIsLoading ? <div>Loading</div> :
           role.Donor ? 
            <Donor
              fetchAllProjects={fetchAllProjects}
              fetchUserMatches={fetchUserMatches}
              industries={industries}
              matchesResult={displayedResults}
              searchCheckboxClicked={searchCheckboxClicked}
              isFiltering={isFiltering}
              searchRequest={searchRequest}
              allProjectsResults={allProjectsResults}
              userMatchesDisplayed={userMatchesDisplayed}
              industriesList={industriesList}
            />
            : <NonProfit/>
        }
      </div>
    )
  }
}

Home.propTypes = {
  displayedResults: PropTypes.array.isRequired,
  role: PropTypes.object,
  fetchAllProjects: PropTypes.func.isRequired,
  fetchUserMatches: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  searchCheckboxClicked: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  allProjectsResults: PropTypes.array.isRequired,
  userMatchesDisplayed: PropTypes.bool.isRequired,
  industriesList: PropTypes.object,
  homeIsLoading: PropTypes.bool.isRequired,
  getUserInformation: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, search }) => {
  return {
    role: auth.role,
    homeIsLoading: auth.homeIsLoading,
    industries: search.industriesList,
    displayedResults: search.allDisplayedResults,
    isFiltering: search.isFiltering,
    allProjectsResults: search.allProjectsResults,
    userMatchesDisplayed: search.userMatchesDisplayed,
    industriesList: auth.industry
  };
}

const matchDispatchToProps = dispatch => bindActionCreators(
  {
    searchCheckboxClicked,
    getUserInformation,
    searchRequest,
    fetchAllProjects,
    fetchUserMatches
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);

