import React from 'react';
import PropTypes from 'prop-types';

class QuizzRadioComponent extends React.Component {

  render() {
    let answer = this.props.answer;
    let hint = null;
    if (this.props.hint) {
      hint = <small className="form-text text-muted text-danger" dangerouslySetInnerHTML={{ __html: " " + this.props.hint }} />
    }
    return(
      <div className="form-check">
        <label className="form-check-label">
          <input type="radio" className="form-check-input" name="answer" value={ answer.id } onClick={ this.props.onClick } defaultChecked={this.props.checked } />
          <div dangerouslySetInnerHTML={{ __html: " " + answer.textHtml }} />
          { hint }
        </label>
      </div>
    )
  }
}

QuizzRadioComponent.propTypes = {
  answer: PropTypes.object,
  hint: PropTypes.string,
  checked: PropTypes.bool
};

QuizzRadioComponent.defaultProps = {
  checked: false
};

export default QuizzRadioComponent;
