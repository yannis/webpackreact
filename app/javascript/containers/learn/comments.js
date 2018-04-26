import React from 'react';
import ReactDom, { render } from 'react-dom';
import { connect } from 'react-redux';
import LearnCommentsComponent from '../../components/learn/comments/learn-comments-component';
import Rails from 'rails-ujs';
import * as Actions from '../../actions_learn';
import { bindActionCreators } from 'redux';

class LearnCommentsContainer extends React.Component {
  componentDidMount() {
    let payload = {
      url: this.props.url,
      method: 'GET',
      successCallbacks: ['SET_INCLUDED_USERS', 'SET_COMMENTS']
    }
    this.props.actions.fetch(payload);
  }

  render() {
    return (<LearnCommentsComponent
      comments = { this.props.comments }
      currentUserAvatarUrl={ this.props.currentUserAvatarUrl }
    />)
  }
}

function  mapStateToProps(state) {
  return {
    comments: state.comment.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnCommentsContainer);
