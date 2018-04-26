import React from 'react';
import ReactDom, { render } from 'react-dom';
import { connect } from 'react-redux';
import LearnUnitQuestionsComponent from '../../components/learn/units/learn-unit-questions-component';
import Rails from 'rails-ujs';
import * as Actions from '../../actions_learn';
import { bindActionCreators } from 'redux';

class LearnQuestionsContainer extends React.Component {
  componentDidMount() {
    let payload = {
      url: this.props.url,
      method: 'GET',
      successCallbacks: ['SET_INCLUDED_QUESTION_ANSWERS', 'SET_INCLUDED_USERS', 'SET_QUESTIONS']
    }
    this.props.actions.fetch(payload);
  }

  render() {
    return(<LearnUnitQuestionsComponent
      questions = { this.props.questions }
      currentUserAvatarUrl={ this.props.currentUserAvatarUrl }
    />)
  }
}

function  mapStateToProps(state) {
  return {
    questions: state.question.questions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnQuestionsContainer);
