import React from 'react';
import PropTypes from 'prop-types';
import autosize from 'autosize/dist/autosize.js';

class LearnTextQuizzComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: props.element.attributes.learnerLastAnswer || '',
      message: null,
      errors: null,
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  handleChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);
    let url = element.links.textQuizzAnswer;
    let answer = this.state.answer;
    $.ajax({
      beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      url: url,
      type: 'post',
      data: {
        text_quizz_answer: {
          content: answer
        }
      }
    }).done( (response) => {
      _this.setState({
        errors: null,
        message: element.attributes.successMessageHtml,
        success: true
      })
    }).fail((jqXHR, textStatus, errorThrown) => {
      _this.setState({
        errors: jqXHR.responseJSON ? jqXHR.responseJSON.errors : { 'Error': [errorThrown] },
        success: false
      })
    });
  }

  render() {
    let _this = this;
    let element = this.props.element;

    let answer_input_name = "text_quizz_answer[content]";
    let answer_input_id = "text_quizz_answer_content";
    let answer_form_group_class = "form-group";
    let answer_input_class = "text_quizz_answer_content form-control";

    let errors = [];
    let message;

    if (this.state.errors) {
      $.each(this.state.errors, function(attr, errs) {
        if (attr === 'content') {
          attr = 'Answer'
        }
        $.each(errs, function(i, err) {
          errors.push(<div key={ i } className="alert has-error"><div className='help-block'>{attr} {err}</div></div>)
        })
      })
    }

    let content;
    if (this.state.success) {
      content = <div className="card mb-3 text-white bg-success">
        <div className='card-header' dangerouslySetInnerHTML={{ __html: this.state.message }} />
      </div>
    } else {
      content = <form className='quizz' onSubmit={ this.handleSubmit } >
        <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
        { errors }
        <div className={ answer_form_group_class }>
          <textarea onChange={ this.handleChange } id={ answer_input_id } name={ answer_input_name } className={ answer_input_class } value={this.state.answer} />
        </div>
        <div className='form-group'>
          <button className='btn btn-info'>Submit answer</button>
        </div>
      </form>
    }

    return(content)
  }
}

LearnTextQuizzComponent.propTypes = {
  element: PropTypes.object
};

export default LearnTextQuizzComponent;
