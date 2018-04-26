import React from 'react';
import ReactDom, { render } from 'react-dom';
import { connect } from 'react-redux';
import LearnQuestionComponent from '../components/learn/questions/learn-question-component';
import LearnQuestionFormComponent from '../components/learn/questions/learn-question-form-component';
import Rails from 'rails-ujs';
import * as Actions from '../actions_learn';
import { bindActionCreators } from 'redux';

class QuestionContainer extends React.Component {

  componentDidMount() {
    let question = JSON.parse(this.props.question);
    this.props.actions.setIncludedQuestionAnswers(question);
    this.props.actions.setIncludedUsers(question);
    this.props.actions.updateQuestion(question);
  }

  render() {
    let questionData = JSON.parse(this.props.question);
    let questionId = questionData.data.id;
    let question = this.props.questions.find((question) => {
      return parseInt(question.id) === parseInt(questionId);
    })
    let questionElement = <p>Finding question</p>;
    if (question) {
      let user = this.props.users.find((user) => {
        return parseInt(user.id) === parseInt(question.attributes.userId);
      })
      questionElement = <LearnQuestionComponent
        question={question}
        user={user}
        currentUserAvatarUrl={this.props.currentUserAvatarUrl}
      />
      if (this.props.editQuestion && parseInt(this.props.editQuestion.id) === parseInt(question.id)) {
        questionElement = <LearnQuestionFormComponent
          url={question.links.self}
          question={question}
        />
      }
    }
    return(questionElement)
  }
}

function  mapStateToProps(state) {
  return {
    questions: state.question.questions,
    editQuestion: state.question.editQuestion,
    users: state.user.users,
    questionAnswers: state.questionAnswer.questionAnswers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);