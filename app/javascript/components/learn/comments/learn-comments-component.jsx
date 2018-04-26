import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import LearnCommentComponent from './learn-comment-component';
import LearnCommentFormComponent from './learn-comment-form-component';
import Flash from '../../../utilities/flash';
import swal from 'sweetalert2';
import moment from 'moment';
import _ from 'lodash';

class LearnUnitCommentsComponent extends React.Component {

  render() {
    const _this = this;
    let commentElements = [];
    let comments = this.props.comments.sort((a, b) => {
      return Date.parse(a.attributes.createdAt) - Date.parse(b.attributes.createdAt)
    }).reverse()

    comments.forEach((comment, index) => {
      let user = _this.props.users.find((user) => {
        return parseInt(user.id) === comment.attributes.authorId;
      })
      var avatarLink;
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

      let text;
      if (comment.attributes.sanitizedTextHtml) {
        text = <div dangerouslySetInnerHTML={{ __html: comment.attributes.sanitizedTextHtml }} />
      }

      let adminLinks = [];
      if (comment.attributes.updatable) {
        adminLinks.push(<a href='#' key='1' className='link' onClick={this.handleEdit}>Edit</a>)
      }
      if (comment.attributes.destroyable) {
        adminLinks.push(<a href='#' key='2' className='link' onClick={this.handleDestroy}>Destroy</a>)
      }
      let adminLinkElements = [];
      _.compact(adminLinks).forEach((link, i) => {
        adminLinkElements.push(' · ')
        adminLinkElements.push(link)
      })
      let element = <LearnCommentComponent
        key={index}
        comment={comment}
        user={user}
        currentUserAvatarUrl={this.props.currentUserAvatarUrl}
      />

      if (this.props.editComment && parseInt(this.props.editComment.id) === parseInt(comment.id)) {
        element = <LearnCommentFormComponent
          key={index}
          url={comment.links.self}
          comment={comment}
        />
      }
      commentElements.push(element);
    });

    let noCommentsText;
    if (comments.length === 0) {
      noCommentsText = <p>No comments yet</p>
    }

    return(<div className="unit-comments" id="comments">
      <header>
        <h5>Comments</h5>
        <small>
          <a data-toggle="modal" href='#' data-target="#commentFormModal">Post a Comment</a>
        </small>
      </header>
      {noCommentsText}
      {commentElements}
    </div>);
  }
}

function  mapStateToProps(state) {
  return {
    comments: state.comment.comments,
    editComment: state.comment.editComment,
    users: state.user.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnUnitCommentsComponent);
