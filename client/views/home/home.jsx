import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './_home.sass';
import Donor from './donor/donor';
import NonProfit from './non-profit/non-profit';
import { searchCheckboxClicked, searchRequest, fetchAllOrganizations, fetchUserMatches } from '../../actions/search/searchActions';
import { getUserInformation, editOrganizationInformation } from '../../actions/auth/authActions';
import { firstMessageSent } from '../../actions/messaging/messagingActions';
import jwt from 'jsonwebtoken';


class Home extends Component {
  
  componentWillMount() {
    const { getUserInformation } = this.props;
    const { email } = jwt.decode(localStorage.jwtToken);
    getUserInformation(email, 'home');
  }

  render() {
    const {
      role,
      firstname,
      email,
      organization,
      industries,
      displayedResults,
      searchCheckboxClicked,
      isFiltering,
      homeIsLoading,
      searchRequest,
      fetchAllOrganizations,
      fetchUserMatches,
      allOrganizationsResults,
      userMatchesDisplayed,
      industriesList,
      firstMessageSent,
      editOrganizationInformation
    } = this.props;
    return (
      <div>
        { homeIsLoading ? <div>Loading</div> :
           role.Donor ? 
            <Donor
              userEmail={email}
              userFirstname={firstname}
              fetchAllOrganizations={fetchAllOrganizations}
              fetchUserMatches={fetchUserMatches}
              industries={industries}
              matchesResult={displayedResults}
              searchCheckboxClicked={searchCheckboxClicked}
              isFiltering={isFiltering}
              searchRequest={searchRequest}
              allOrganizationsResults={allOrganizationsResults}
              userMatchesDisplayed={userMatchesDisplayed}
              industriesList={industriesList}
              firstMessageSent={firstMessageSent}
            />
            : <NonProfit
                organization={organization}
                editOrganizationInformation={editOrganizationInformation}
                userEmail={email}
              />
        }
      </div>
    )
  }
}

Home.propTypes = {
  displayedResults: PropTypes.array.isRequired,
  role: PropTypes.object,
  firstname: PropTypes.string,
  email: PropTypes.string,
  organization: PropTypes.object,
  fetchAllOrganizations: PropTypes.func.isRequired,
  fetchUserMatches: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  searchCheckboxClicked: PropTypes.func.isRequired,
  industries: PropTypes.array.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  allOrganizationsResults: PropTypes.array.isRequired,
  userMatchesDisplayed: PropTypes.bool.isRequired,
  industriesList: PropTypes.object,
  homeIsLoading: PropTypes.bool.isRequired,
  getUserInformation: PropTypes.func.isRequired,
  firstMessageSent: PropTypes.func.isRequired,
  editOrganizationInformation: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, search }) => {
  return {
    role: auth.role,
    firstname: auth.firstname,
    email: auth.email,
    organization: auth.organization,
    homeIsLoading: auth.homeIsLoading,
    industries: search.industriesList,
    displayedResults: search.allDisplayedResults,
    isFiltering: search.isFiltering,
    allOrganizationsResults: search.allOrganizationsResults,
    userMatchesDisplayed: search.userMatchesDisplayed,
    industriesList: auth.industry
  };
}

const matchDispatchToProps = dispatch => bindActionCreators(
  {
    searchCheckboxClicked,
    getUserInformation,
    searchRequest,
    fetchAllOrganizations,
    fetchUserMatches,
    firstMessageSent,
    editOrganizationInformation
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Home);

