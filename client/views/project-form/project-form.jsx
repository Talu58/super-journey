import React, { Component, PropTypes } from 'react';
import './_project-form.sass';
import InputField from '../../components/input-field/input-field';
import TextAreaField from '../../components/text-area-field/text-area-field';
import Button from '../../components/button/button';

export default class ProjectForm extends Component {
  render() {
    const { changeHandler, values } = this.props;
    return (
      <div>
        <form>
          <InputField 
            changeHandler={changeHandler}
            placeholderText="Enter your Project Title"
            styleClassName="project-form-input-field"
            name="title"
            value={values.title}
            type="text"
          />
          <TextAreaField
            changeHandler={changeHandler}
            placeholderText="Enter your Project Description"
            rows={15}
            styleClassName="project-form-text-area-field"
            name="description"
            value={values.description}
          />
        </form>
      </div>
    )
  }
};

ProjectForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired
};
