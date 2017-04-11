import React, { Component, PropTypes } from 'react';
import './_project-form.sass';
import InputField from '../../components/input-field/input-field';
import TextAreaField from '../../components/text-area-field/text-area-field';
import Button from '../../components/button/button';

export default class ProjectForm extends Component {
  render() {
    const { changeHandler, values, uploadFileHandler } = this.props;
    return (
      <div>
        <form className="project-form">
          <InputField 
            changeHandler={changeHandler}
            placeholderText="Enter your Project Title"
            styleClassName="project-form-input-field"
            containerStyleClassName="project-form-input-field-container"
            name="title"
            value={values.title}
            type="text"
          />
          <TextAreaField
            changeHandler={changeHandler}
            placeholderText="Enter your Project Description"
            rows={15}
            styleClassName="project-form-text-area-field"
            containerStyleClassName="project-form-text-area-field-container"
            name="description"
            value={values.description}
          />
        </form>
        <form encType="multipart/form-data">
          <input
            onChange={uploadFileHandler}
            className="project-form-file-upload"
            id="upload-input"
            type="file"
            name="upload"
          />
        </form>
      </div>
    )
  }
};

ProjectForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  uploadFileHandler: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
