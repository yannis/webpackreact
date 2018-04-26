import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import LearnUpvoteComponent from '../upvotes/learn-upvote-component';
import moment from 'moment';
import swal from 'sweetalert2';

// import _ from 'lodash';

class LearnQuestionAnswerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
      title: 'Are you sure you want to delete this answer?',
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
        let answer = this.props.answer;
        let payload = {
          url: answer.links.self,
          method: 'DELETE',
          successCallbacks: ['REMOVE_QUESTION_ANSWER', 'SET_INCLUDED_QUESTIONS']
        }
        this.props.actions.fetch(payload);
      }
    })
  }

  handleEdit(e) {
    e.preventDefault();
    this.props.actions.editQuestionAnswer(this.props.answer);
  }

  render() {
    const answer = this.props.answer;
    const user = this.props.user;

    let avatarLink = <img className='avatar' alt={user.attributes.username} src={user.links.avatarMedium} />;
    let usernameLink = user.attributes.username;

    if (user.attributes.readable) {
      avatarLink = <a href={'/learn/users/' + user.id}>{avatarLink}</a>;
      usernameLink = <a href={'/learn/users/' + user.id}>{usernameLink}</a>;
    }

    let adminLinks = [];
    if (answer.attributes.updatable) {
      adminLinks.push(<a href='#' key='2' onClick={this.handleEdit}>Edit</a>)
    }
    if (answer.attributes.destroyable) {
      adminLinks.push(<a href='#' key='1' onClick={this.handleDestroy}>Destroy</a>)
    }
    let adminLinkElements = [];
    _.compact(adminLinks).forEach((link, i) => {
      adminLinkElements.push(' · ')
      adminLinkElements.push(link)
    })
    let upvoteComponent = <LearnUpvoteComponent
      upvotesCount={answer.attributes.upvotesCount}
      upvotable={answer}
    />

    return (
      <div>
        <div className="answer question-answer d-flex" id={ 'question_answer_' + answer.id }>
          <div className="d-flex">
            {avatarLink}
            <div>
              <small>
                {usernameLink} · {user.attributes.type} · {moment(answer.attributes.createdAt).fromNow()} {adminLinkElements}
              </small>
              <div dangerouslySetInnerHTML={{ __html: answer.attributes.sanitizedTextHtml }} />
            </div>
          </div>
          { upvoteComponent }
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LearnQuestionAnswerComponent);