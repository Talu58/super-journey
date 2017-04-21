import React, { Component, PropTypes } from 'react';
import './_organization-form.sass';
import InputField from '../../components/input-field/input-field';
import TextAreaField from '../../components/text-area-field/text-area-field';
import Button from '../../components/button/button';

export default class OrganizationForm extends Component {
  render() {
    const { changeHandler, values, uploadFileHandler, header } = this.props;
    return (
      <div>
        <h1 className="signup-step-header">{header}</h1>
        <form className="organization-form">
          <InputField 
            changeHandler={changeHandler}
            placeholderText="Enter your Organization Name"
            styleClassName="organization-form-input-field"
            containerStyleClassName="organization-form-input-field-container"
            name="name"
            value={values.name}
            type="text"
          />
          <TextAreaField
            changeHandler={changeHandler}
            placeholderText="Enter your Organization Description"
            rows={15}
            styleClassName="organization-form-text-area-field"
            containerStyleClassName="organization-form-text-area-field-container"
            name="description"
            value={values.description}
          />
        </form>
        <form encType="multipart/form-data"  className="organization-form">
          <input
            onChange={uploadFileHandler}
            className="organization-form-file-upload"
            id="upload-input"
            type="file"
            name="upload"
          />
        </form>
      </div>
    )
  }
};

OrganizationForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  uploadFileHandler: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired
};
