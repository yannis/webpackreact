import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';

class LearnUpvoteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltipText: props.upvotable.attributes.upvoted ? 'You upvoted this answer' : 'Upvote this answer'
    }
    this.handleUpvote = this.handleUpvote.bind(this)
  }

  componentDidMount() {
    const node = findDOMNode(this);
    $(node).find('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    const node = findDOMNode(this);
    $(node).find('[data-toggle="tooltip"]').tooltip();
  }

  componentWillReceiveProps(nextProps) {
    let tooltipText = nextProps.upvotable.attributes.upvoted ? 'You upvoted this answer' : 'Upvote this answer'
    this.setState({
      tooltipText
    })
    const tooltips = $(findDOMNode(this)).find('[data-toggle="tooltip"]');
    tooltips.tooltip('dispose');
    tooltips.tooltip({
      title: tooltipText
    });
  }

  handleUpvote(e) {
    e.preventDefault();
    let upvotable = this.props.upvotable;
    let method = upvotable.attributes.upvoted ? 'DELETE' : 'POST';
    let payload = {
      url: upvotable.links.upvote,
      method,
      successCallbacks: ['SET_INCLUDED_QUESTION_ANSWERS']
    }
    this.props.actions.fetch(payload);
  }

  render() {
    const upvotable = this.props.upvotable;
    let element = <div className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="You can't upvote this answer" >
        <svg className="icon icon-md float-left"><use xlinkHref={SpritePath + '#check'}></use></svg>&nbsp;<span>{this.props.upvotesCount}</span>
      </div>

    if (upvotable.attributes.upvotable) {
      let classes = upvotable.attributes.upvoted ? "icon icon-md float-left icon-positive" : "icon icon-md float-left"
      element = <button onClick={this.handleUpvote} className="btn btn-secondary" type='button' data-toggle="tooltip" data-placement="top" data-title={this.state.tooltipText}>
          <svg className={classes}><use xlinkHref={SpritePath + '#check'}></use></svg>&nbsp;<span>{this.props.upvotesCount}</span>
      </button>
    }

    return (<div className='upvote'>{element}</div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LearnUpvoteComponent);