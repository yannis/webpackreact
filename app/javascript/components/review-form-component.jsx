import React from 'react';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autosize from 'autosize/dist/autosize.js';

class ReviewFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  submitForm(e) {
    e.preventDefault();
    this.props.actions.fetchData({
      url: this.props.url,
      method: this.props.method || 'post',
      data: new FormData(e.target),
      success: this.props.success || Actions.ADD_REVIEW
    })
  }

  render() {
    let errors = this.props.errors || {};

    let baseErrors;

    if (errors.base) {
      $.each(errors.base, function(i, error) {
        baseErrors.push(<p key={ i } className="form-control-feedback">{error}</p>)
      })
    }

    let comment_input_name = "review[comment]";
    let comment_input_id = "review_comment";
    let comment_form_group_class = "form-group";
    let comment_input_class = "review_comment form-control";
    let comment_input_value = this.props.element ? this.props.element.attributes.comment : null ;
    let comment_input_errors = [];
    if (errors.comment) {
      comment_form_group_class = comment_form_group_class + ' has-danger';
      comment_input_class = comment_input_class + ' form-control-danger';
      $.each(errors.comment, function(i, error) {
        comment_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }

    let status_input_name = "review[status]";
    let status_input_errors = [];
    if (errors.status) {
      status_form_group_class = status_form_group_class + ' has-danger';
      status_input_class = status_input_class + ' form-control-danger';
      $.each(errors.status, function(i, error) {
        status_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }

    const statusCheckBoxes = ['draft', 'approved'].map((status, index) => {
      return(
        <label key={ index } className="form-check-label">
          <input type='radio' name={ status_input_name } value={ status } className='form-check-input-inline' defaultChecked={ this.props.element ? (this.props.element.attributes.status === status) : false } />
          { status }
        </label>
      )
    })

    let buttonText = this.props.element ? 'Update review' : 'Add review'

    return (
      <form onChange={ this.setValue } onSubmit={ this.submitForm } className='form'>
        <h3>{ buttonText }</h3>
        <div className={ comment_form_group_class }>
          <label className='form-control-label' htmlFor={ comment_input_id } >Text <span className='red_star'>*</span></label>
          <textarea id={ comment_input_id } name={ comment_input_name } className={ comment_input_class } defaultValue={ comment_input_value } autoFocus required />
          { comment_input_errors }
        </div>
        <div className="form-check">
          Set unit status to
          { statusCheckBoxes }
          { status_input_errors }
        </div>
        <div className="actions">
          <input type='submit' className='btn btn-primary' value={ buttonText } /> or 
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ReviewFormComponent);
