import React, { Component, PropTypes } from 'react';
import './_modal-edit-organization.sass';
import Button from '../../components/button/button';
import InputField from '../../components/input-field/input-field';
import TextAreaField from '../../components/text-area-field/text-area-field';

export default class ModalEditOrganization extends Component {
  render() {
    const { props: { clickHandler, changeHandler, values, header, errors } } = this.props;
    return (
      <div>
        <h1 className="edit-oganization-header">{header}</h1>
        <form className="edit-organization-form">
          <InputField 
            changeHandler={changeHandler}
            placeholderText="Enter your Organization Name"
            styleClassName="edit-organization-form-input-field"
            containerStyleClassName="edit-organization-form-input-field-container"
            name="name"
            value={values.name}
            type="text"
          />
          {errors.name ?
            <p className="edit-organization-error-message">{errors.name}</p>
            : <p className="edit-organization-error-message"></p>
          }
          <TextAreaField
            changeHandler={changeHandler}
            placeholderText="Enter your Organization Description"
            rows={15}
            styleClassName="edit-organization-form-text-area-field"
            containerStyleClassName="edit-organization-form-text-area-field-container"
            name="description"
            value={values.description}
          />
          {errors.description ?
            <p className="edit-organization-error-message">{errors.description}</p>
            : <p className="edit-organization-error-message"></p>
          }
        </form>
        <Button
          value="Save"
          clickHandler={clickHandler}
          styleClassName="button-primary"
        />
      </div>
    )
  }
};

ModalEditOrganization.propTypes = {
  props: PropTypes.object.isRequired
};
