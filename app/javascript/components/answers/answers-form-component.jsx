import React from 'react';
import { findDOMNode, render } from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditFormAnswersComponent from './edit-answers-component';
import AddNewAnswersComponent from './answers-add-component';

class FormAnswersComponent extends React.Component {

  constructor(props) {
    super(props);
    let answers = this.props.answers;
    if (typeof(this.props.answers) === 'string') {
      answers = JSON.parse(this.props.answers);
    }
    this.state = {
      answers
    };
  }

  render() {
    let addNewAnswersComponent = <AddNewAnswersComponent
        objectType={ this.props.objectType }
        objectId={ this.props.objectId }
        answersCount={ this.state.answers.length }
        text={ this.props.text } />;
    return(
      <div>
        <EditFormAnswersComponent
          answers={ this.state.answers }
          objectType={ this.props.objectType }
          objectId={ this.props.objectId }
          errors={ this.props.errors }
        />
        { addNewAnswersComponent }
      </div>
    )
  }
}

$(document).on('turbolinks:load', function(){
  let el = document.getElementById('answer-component');
  if (el) {
    let objectType = el.dataset.object_type;
    let objectId = el.dataset.object_id;
    let answers = el.dataset.answers;
    let text = el.dataset.text;
    render(<FormAnswersComponent
      objectType={ objectType }
      objectId={ objectId }
      answers={ answers }
      text={ text } />, el);
  }
})

export default FormAnswersComponent;
