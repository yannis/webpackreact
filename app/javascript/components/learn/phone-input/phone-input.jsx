import React from 'react';
import ReactTelephoneInput from 'react-telephone-input';

class PhoneInputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({
      value
    })
  }

  render() {
    return(
      <div>
        <ReactTelephoneInput
          value={ this.state.value }
          flagsImagePath={ this.props.flags }
          onChange={ this.handleChange }
          preferredCountries={['ch']}
          defaultCountry={'ch'}
          inputId={ this.props.inputId }
        />
        <input type='hidden' name={ this.props.name } value={ this.state.value } />
      </div>
    )
  }
}

export default PhoneInputComponent;
