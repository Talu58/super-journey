import React, { Component, PropTypes } from 'react';
import './_match.sass';
import Button from '../../../../components/button/button';
import Modal from '../../../../components/modal/modal';


export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMoreOpen: false
    }
    this.seeMoreClicked = this.seeMoreClicked.bind(this);
    this.closeModalClicked = this.closeModalClicked.bind(this);
  }

  seeMoreClicked() {
    this.setState({
      seeMoreOpen: true
    });
  }

  closeModalClicked() {
    this.setState({
      seeMoreOpen: false
    });
  }

  render() {
    const { title, description, industryNames } = this.props;
    const industryNamesKeys = Object.keys(industryNames);
    return (
      <div className="match-container">
        <section className="industry-name-bullets-container" >
          {industryNamesKeys.map(industryName => {
            const industryNameFormatted = industryName.replace(/\s/g, '').toLowerCase();
            return <p key={industryName} className={`industry-name-bullet industry-name-bullet-${industryNameFormatted}`}></p>
          })}
        </section>
        <h3 className="match-title">{title}</h3>
        <hr className="match-separator" />
        <p className="match-description">{description}</p>
        <section className="match-action-container">
          <Button
            value="See More"
            styleClassName="button-primary"
            clickHandler={this.seeMoreClicked}
          />
          <Button
            value="Contact"
            styleClassName="button-primary"
          />
        </section>
        <Modal
          isOpen={this.state.seeMoreOpen}
          closeModalHandler={this.closeModalClicked}
          title={title}
          description={description}
        />
      </div>
    );
  }
};

Match.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  industryNames: PropTypes.object.isRequired
};
