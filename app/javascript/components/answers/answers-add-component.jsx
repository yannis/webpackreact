import React from 'react';
import { findDOMNode, render } from 'react-dom';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';
import NewAnswerComponent from './new-answer-component.jsx'

class AddNewAnswersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersCount: this.props.answersCount,
      newAnswers: []
    };
    this.addAnswer = this.addAnswer.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  removeAnswer(id) {
    let answerComponent = $.grep(this.state.newAnswers, function(e){ return e.key == id; })[0];
    let newAnswers = jQuery.grep(this.state.newAnswers, function(comp) {
      return comp != answerComponent;
    });
    this.setState(() => {
      return { newAnswers }
    })
  }

  addAnswer() {
    let newId = (new Date().getTime());
    let objectId = this.props.objectId;
    let objectType = this.props.objectType;
    let newAnswer = <NewAnswerComponent
                    answerId={ newId }
                    key={ newId }
                    objectType={ objectType }
                    objectId={ objectId }
                    onRemove={ this.removeAnswer } />;
    this.setState(() => {
      return {
        newAnswers: this.state.newAnswers.concat([newAnswer])
      }
    })
  }

  render() {
    let defaultText = this.state.answersCount > 0 ? "Add another answer" : "Add an answer";
    let text = (this.props.text || defaultText);
    return (
      <div>
        { this.state.newAnswers }
        <a onClick={ this.addAnswer } className="btn btn-secondary btn-sm answer-add-link">
          <i className="fa fa-plus" aria-hidden="true"></i>
          { " " + text }
        </a>
      </div>
    );
  }
}

export default AddNewAnswersComponent;
