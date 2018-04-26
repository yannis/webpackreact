import React from 'react';
import PropTypes from 'prop-types';

class QuizzCheckboxComponent extends React.Component {
  render() {
    let answer = this.props.answer;
    let hint = null;
    if (this.props.hint) {
      hint = <small className="form-text text-muted text-danger" dangerouslySetInnerHTML={{ __html: " " + this.props.hint }} />
    }
    return(
      <div className="form-check">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" name="answer" value={ answer.id } defaultChecked={ this.props.checked } />
          <div dangerouslySetInnerHTML={{ __html: " " + answer.textHtml }} />
          { hint }
        </label>
      </div>
    )
  }
}

QuizzCheckboxComponent.propTypes = {
  answer: PropTypes.object,
  hint: PropTypes.string,
  checked: PropTypes.bool
};

QuizzCheckboxComponent.defaultProps = {
  checked: false
};

export default QuizzCheckboxComponent;
