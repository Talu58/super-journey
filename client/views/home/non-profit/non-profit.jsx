import React, { Component, PropTypes } from 'react';
import './_non-profit.sass';
import Button from '../../../components/button/button';
import Modal from '../../../components/modal/modal';
import ModalEditOrganization from '../../modal-edit-organization/modal-edit-organization';

export default class NonProfit extends Component {
  constructor(props) {
    super(props);
    const { organization } = props;
    this.state = {
      editOrganizationDataOpen: false,
      inputFieldsValues: {
        name: organization.name,
        description: organization.description
      },
      errors: {
        name: '',
        description: ''
      }
    }
    this.organizationFormChangeHandler = this.organizationFormChangeHandler.bind(this)
    this.isFormValid = this.isFormValid.bind(this);
    this.editOrganizationClicked = this.editOrganizationClicked.bind(this);
    this.closeEditOrganizationModal = this.closeEditOrganizationModal.bind(this);
    this.saveEditedOrganizationClicked = this.saveEditedOrganizationClicked.bind(this);
  }

  organizationFormChangeHandler(e) {
    const { inputFieldsValues } = this.state;
    const newState = {
      ...inputFieldsValues,
      [e.target.name]: e.target.value
    };
    this.setState({
      inputFieldsValues: newState,
    });
  }

  isFormValid() {
    let isValid = true;
    let newErrors = {
      ...this.state.errors
    };
    for (let key in this.state.inputFieldsValues) {
      if (this.state.inputFieldsValues[key] === '') {
        newErrors[key] = '* This field is required';
        isValid = false;
      } else {
        newErrors[key] = '';
      }
    }
    this.setState({
      errors: newErrors
    });
    return isValid;
  }

  saveEditedOrganizationClicked() {
    const isValid = this.isFormValid();
    const { editOrganizationInformation, userEmail } = this.props;
    if (isValid) {
      this.setState({
        editOrganizationDataOpen: false
      });
      const information = {
        organizationName: this.state.inputFieldsValues.name,
        organizationDescription: this.state.inputFieldsValues.description,
        userEmail
      }
      editOrganizationInformation()
    }
  }

  editOrganizationClicked() {
    this.setState({
      editOrganizationDataOpen: true
    });
  }

  closeEditOrganizationModal() {
    this.setState({
      editOrganizationDataOpen: false
    });
  }

  render() {
    const { organization } = this.props;
    const organizationFormProps = {
      shouldShowUploadFileHandler: false,
      changeHandler: this.organizationFormChangeHandler,
      header: 'Edit your Organization\'s Information',
      values: this.state.inputFieldsValues,
      clickHandler: this.saveEditedOrganizationClicked,
      errors: this.state.errors
    };
    return (
      <div className="organization-profile-view">
        <div className="organization-profile-container">
          <h1 className="organization-profile-information-header">Your Organization's information:</h1>
          <section className="organization-profile-information-container">
            <p>Name:</p>
            <p className="organization-details">{organization.name}</p>
            <p>Description:</p>
            <p className="organization-details">{organization.description}</p>
          </section>
          <Button
            value="Edit"
            styleClassName="organization-profile-edit-button"
            clickHandler={this.editOrganizationClicked}
          />
          <Modal
            isOpen={this.state.editOrganizationDataOpen}
            closeModalHandler={this.closeEditOrganizationModal}
            ChildComponent={ModalEditOrganization}
            childComponentsProps={organizationFormProps}
          />
        </div>
      </div>
    );
  }
}

NonProfit.propTypes = {
  organization: PropTypes.object.isRequired,
  editOrganizationInformation: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired
};

