import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

class LearnUnitButtonComponent extends React.Component {
  componentDidMount() {
    const node = findDOMNode(this);
    $(node).find('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    let buttonDisabled = _.includes(Object.values(this.props.completions), false);
    let button;

    if (buttonDisabled) {
      button = <div><p className='btn btn-secondary btn-block' data-toggle="tooltip" data-placement="top" title="Complete all quizzes to enable the next unit">Next</p></div>
    } else {
      button = <div><a href={ this.props.progressUrl } data-method='put' className='btn btn-primary btn-block' disabled={ buttonDisabled } >Next</a></div>
    }

    return (button);
  }
}

function  mapStateToProps(state) {
  return {
    completions: state.unit.completions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnUnitButtonComponent);
