import React, { Component, PropTypes } from 'react';
import './_match.sass';
import Button from '../../../../components/button/button';
import Modal from '../../../../components/modal/modal';
import ModalSeeMore from '../../../modal-see-more/modal-see-more';
import ModalMessage from '../../../modal-message/modal-message';


export default class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMoreOpen: false,
      messageOpen: false
    }
    this.seeMoreClicked = this.seeMoreClicked.bind(this);
    this.messageClicked = this.messageClicked.bind(this);
    this.closeModalClicked = this.closeModalClicked.bind(this);
  }

  seeMoreClicked() {
    this.setState({
      seeMoreOpen: true
    });
  }

  messageClicked() {
    this.setState({
      messageOpen: true
    });
  }

  closeModalClicked() {
    this.setState({
      seeMoreOpen: false,
      messageOpen: false
    });
  }

  render() {
    const { title, description, industryNames } = this.props;
    const industryNamesKeys = Object.keys(industryNames);
    const seeMoreModalProps = {
      title,
      description,
      industryNames: industryNamesKeys
    };
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
            value="Message"
            styleClassName="button-primary"
            clickHandler={this.messageClicked}
          />
        </section>
        <Modal
          isOpen={this.state.seeMoreOpen}
          closeModalHandler={this.closeModalClicked}
          ChildComponent={ModalSeeMore}
          childComponentsProps={seeMoreModalProps}
        />
        <Modal
          isOpen={this.state.messageOpen}
          closeModalHandler={this.closeModalClicked}
          ChildComponent={ModalMessage}
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
