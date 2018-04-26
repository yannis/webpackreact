import React from 'react';
import Rails from 'rails-ujs';

class FormErrorsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let messages = [];
    for (let k in this.props.errors) {
      messages.push(<li className='list-group-item list-group-item-danger' key={ k } >{ k + ' ' + this.props.errors[k] }</li>)
    }
    return (
      <ul className='list-group' >{ messages }</ul>
    )
  }
}

export default FormErrorsComponent;
