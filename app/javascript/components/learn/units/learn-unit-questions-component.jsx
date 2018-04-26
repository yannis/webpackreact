import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import LearnQuestionComponent from '../questions/learn-question-component';
import LearnQuestionFormComponent from '../questions/learn-question-form-component';

class LearnUnitQuestionsComponent extends React.Component {

  render() {
    const _this = this;
    let questionElements = [];
    let questions = this.props.questions.sort((a, b) => {
      return Date.parse(a.attributes.createdAt) - Date.parse(b.attributes.createdAt)
    }).reverse()

    questions.forEach((question, index) => {
      let user = _this.props.users.find((user) => {
        return parseInt(user.id) === question.attributes.userId;
      })
      let element = <LearnQuestionComponent
        key={index}
        question={question}
        user={user}
        currentUserAvatarUrl={ this.props.currentUserAvatarUrl }
      />
      if (this.props.editQuestion && parseInt(this.props.editQuestion.id) === parseInt(question.id)) {
        element = <LearnQuestionFormComponent
          key={index}
          url={question.links.self}
          question={question}
        />
      }
      questionElements.push(element);
    });

    let noQuestionsText;
    if (questions.length === 0) {
      noQuestionsText = <p>No questions yet</p>
    }

    return(<div className="unit-questions" id="questions">
      <header>
        <h5>Questions</h5>
        <small>
          <a data-toggle="modal" href='#' data-target="#questionFormModal">Ask a Question</a>
        </small>
      </header>
      {noQuestionsText}
      {questionElements}
    </div>);
  }
}

function  mapStateToProps(state) {
  return {
    questions: state.question.questions,
    editQuestion: state.question.editQuestion,
    questionAnswers: state.questionAnswer.questionAnswers,
    users: state.user.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnUnitQuestionsComponent);
