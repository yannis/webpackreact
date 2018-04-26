import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import Flash from '../../../utilities/flash';
import swal from 'sweetalert2';
import moment from 'moment';
import _ from 'lodash';

class LearnCommentComponent extends React.Component {

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
      title: 'Are you sure you want to delete this comment?',
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
        let comment = this.props.comment;
        let payload = {
          url: comment.links.self,
          method: 'DELETE',
          successCallbacks: ['REMOVE_COMMENT']
        }
        this.props.actions.fetch(payload);
      }
    })
  }

  handleEdit(e) {
    e.preventDefault();
    this.props.actions.editComment(this.props.comment);
  }

  render() {
    const _this = this;
    const comment = this.props.comment;
    const user = this.props.users.filter((item) => {
      return parseInt(item.id) === comment.attributes.authorId;
    })[0];

    let text;
    if (comment.attributes.sanitizedTextHtml) {
      text = <div dangerouslySetInnerHTML={{ __html: comment.attributes.sanitizedTextHtml }} />
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
    let commentAnswerForm;
    let answerIndicator;
    if (comment.attributes.updatable) {
      adminLinks.push(<a href='#' key='1' className='link' onClick={this.handleEdit}>Edit</a>)
    }
    if (comment.attributes.destroyable) {
      adminLinks.push(<a href='#' key='2' className='link' onClick={this.handleDestroy}>Destroy</a>)
    }
    if (comment.attributes.hidable) {
      adminLinks.push(<a href='#' key='3' className='link' onClick={this.handleHide}>{comment.attributes.hiddenAt !== null ? 'Un-hide' : 'Hide'}</a>)
    }

    let adminLinkElements = [];
     _.compact(adminLinks).forEach((link,i) => {
      adminLinkElements.push(' · ')
      adminLinkElements.push(link)
    })

    return (
      <div className={comment.attributes.hiddenAt !== null ? 'hidden' : '' }>
        <div className="comment-container d-flex" id={'comment_' + comment.id}>
          <div className="d-flex">
            <p>{avatarLink}</p>
            <div>
              <small>
                {usernameLink} · {userType} · {moment(comment.attributes.createdAt).fromNow()} {adminLinkElements}
              </small>
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.user.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnCommentComponent);
