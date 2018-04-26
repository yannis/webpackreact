import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import LearnQuestionAnswerComponent from '../question-answers/learn-question-answer-component';
import LearnQuestionAnswerFormComponent from '../question-answers/learn-question-answer-form-component';
import Flash from '../../../utilities/flash';
import swal from 'sweetalert2';
import moment from 'moment';
import _ from 'lodash';

class LearnQuestionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.showQuestionAnswerForm = this.showQuestionAnswerForm.bind(this);
  }

  componentDidMount() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    Prism.highlightAll();
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    Prism.highlightAll();
  }

  handleDestroy(e) {
    e.preventDefault();
    swal({
      title: 'Are you sure you want to delete this question?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d30a09',
      cancelButtonColor: '#28c664',
      confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, thank you',
      // reverseButtons: false,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        let question = this.props.question;
        let payload = {
          url: question.links.self,
          method: 'DELETE',
          successCallbacks: ['REMOVE_QUESTION']
        }
        this.props.actions.fetch(payload);
      }
    })
  }

  handleEdit(e) {
    e.preventDefault();
    this.props.actions.editQuestion(this.props.question);
  }

  handleHide(e) {
    e.preventDefault();
    const _this = this;
    let question = this.props.question;
    $.ajax({
      url: question.links.hide,
      method: 'PUT'
    }).done((response, message, xhr) => {
      _this.props.actions.updateQuestion(response);
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    }).fail((data) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  showQuestionAnswerForm(e) {
    e.preventDefault();
    let payload = {
      questionId: this.props.question.id
    }
    this.props.actions.showQuestionAnswerForm(payload);
  }

  render() {
    const _this = this;
    const question = this.props.question;
    const user = this.props.users.filter((item) => {
      return parseInt(item.id) === question.attributes.userId;
    })[0];
    let questionAnswers = this.props.questionAnswers.filter((questionAnswer) => {
      return questionAnswer.attributes.questionId === parseInt(question.id);
    });

    questionAnswers = _.orderBy(questionAnswers, ['attributes.upvotesCount', 'attributes.createdAt'], ['desc', 'desc'])

    let answers = [];
    questionAnswers.forEach((answer, index) => {
      let answerUser = _this.props.users.filter((item) => {
        return parseInt(item.id) === answer.attributes.userId;
      })[0]
      let element = <LearnQuestionAnswerComponent
        key={index}
        answer={answer}
        user={answerUser}
      />
      if (this.props.editQuestionAnswer && this.props.editQuestionAnswer.id === answer.id) {
        element = <LearnQuestionAnswerFormComponent
          key={index}
          url={answer.links.self}
          questionAnswer={answer}
          user={answerUser}
          questionId={this.props.question.id}
        />
      }
      answers.push(element);
    });

    let info;
    if (question.attributes.sanitizedInfoHtml) {
      info = <div dangerouslySetInnerHTML={{ __html: question.attributes.sanitizedInfoHtml }} />
    }

    let avatarLink;
    let usernameLink;
    let userType;

    if (user) {
      avatarLink = <img className='avatar' alt={user.attributes.username} src={user.links.avatarMedium} />;
      usernameLink = user.attributes.username;
      userType = user.attributes.type;

      if (user.attributes.readable) {
        avatarLink = <a href={'/learn/users/' + user.id}>{avatarLink}</a>;
        usernameLink = <a href={'/learn/users/' + user.id}>{usernameLink}</a>;
      }
    }

    let adminLinks = [];
    let questionAnswerForm;
    let answerIndicator;
    if (question.attributes.updatable) {
      adminLinks.push(<a href='#' key='1' className='link' onClick={this.handleEdit}>Edit</a>)
    }
    if (question.attributes.destroyable) {
      adminLinks.push(<a href='#' key='2' className='link' onClick={this.handleDestroy}>Destroy</a>)
    }
    if (question.attributes.hidable) {
      adminLinks.push(<a href='#' key='3' className='link' onClick={this.handleHide}>{question.attributes.hiddenAt !== null ? 'Un-hide' : 'Hide'}</a>)
    }
    if (this.props.showingQuestionAnswerForm && this.props.showingQuestionAnswerForm.questionId === question.id) {
      questionAnswerForm = <LearnQuestionAnswerFormComponent
        url={question.links.self + '/question_answers'}
        currentUserAvatarUrl={this.props.currentUserAvatarUrl}
        questionId={this.props.question.id}
      />;
    } else {
      questionAnswerForm = <div>
        <div className="answer question-answer text-right" id={'question_' + question.id}>
          <a href='#' key='3' className='btn btn-secondary btn-sm' onClick={this.showQuestionAnswerForm}>Post answer</a>
        </div>
      </div>
    }
    if (question.attributes.questionAnswersCount > 0) {
      answerIndicator = <div className="answers-indicator">
        <div>
          <svg className="icon icon-md icon-positive"><use xlinkHref={SpritePath + '#check'}></use></svg>&nbsp;<span>{question.attributes.questionAnswersCount}</span>
        </div>
        <small>{question.attributes.questionAnswersCount === 1 ? 'Answer' : 'Answers'}</small>
      </div>
    }
    let adminLinkElements = [];
     _.compact(adminLinks).forEach((link,i) => {
      adminLinkElements.push(' · ')
      adminLinkElements.push(link)
    })

    return (
      <div className={question.attributes.hiddenAt !== null ? 'hidden' : '' }>
        <div className="question-container d-flex" id={'question_' + question.id}>
          <div className="d-flex">
            <p>{avatarLink}</p>
            <div>
              <small>
                {usernameLink} · {userType} · {moment(question.attributes.createdAt).fromNow()} {adminLinkElements}
              </small>
              <p className='question'>{question.attributes.text}</p>
              {info}
            </div>
          </div>
          {answerIndicator}
        </div>
        <div className="answers-container">
          {questionAnswerForm}
          {answers}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showingQuestionAnswerForm: state.question.showingQuestionAnswerForm,
    questionAnswers: state.questionAnswer.questionAnswers,
    editQuestionAnswer: state.questionAnswer.editQuestionAnswer,
    users: state.user.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnQuestionComponent);
