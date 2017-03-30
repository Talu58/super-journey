import React, { Component } from 'react';
import Button from '../../components/button/button';

export default class SignupStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step1: [{value:'Donor', name:'role'}, {value:'NonProfit', name:'role'}],
      step2: [{value:'Global Change', name:'Industry'},{value:'Climate', name:'Industry'},{value:'Inclusion', name:'Industry'},{value:'HealthCare', name:'Industry'},{value:'Tech', name:'Industry'}]
    }
  }
  render() {
    const { match } = this.props;
    console.log('match.params.stepId',match.params.stepId);
    const buttons = [{value:'Donor', name:'role'}, {value:'NonProfit', name:'role'}];
    return (
      <div>
        SignupStep {match.params.stepId}
        {buttons.map(button => (
            <Button key={button.value} value={button.value} name={button.name} />
          )
        )}
      </div>
    )
  }
}