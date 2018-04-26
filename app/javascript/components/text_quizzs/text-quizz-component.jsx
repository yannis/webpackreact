import React from 'react';
import { findDOMNode, render } from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autosize from 'autosize/dist/autosize.js';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import FormTextQuizzComponent from './form-text-quizz-component';

class TextQuizzComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer: null,
      message: null,
      errors: null,
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
  }

  cancelForm(e) {
    e.preventDefault();
    this.props.cancelForm();
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
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);

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
      content = <div className="alert alert-success" dangerouslySetInnerHTML={{__html: this.state.message }} />
    } else {
      content = <form className='quizz' onSubmit={ this.handleSubmit } >
        <BlockAdminButtonComponent block={this.props.block} element={element} />
        <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
        { errors }
        <div className={ answer_form_group_class }>
          <textarea onChange={ this.handleChange } id={ answer_input_id } name={ answer_input_name } className={ answer_input_class } />
        </div>
        <button className='btn btn-info'>Submit answer</button>
      </form>
    }

    if (this.props.editingElement === element) {
      content = <FormTextQuizzComponent
        element={ this.props.editingElement }
        unit={ this.props.unit }
        cancelForm={ this.cancelForm }
        url={ this.props.editingElement.links.self }
        method='patch'
        submitForm={ this.props.submitForm }
        success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
        errors={ this.props.errors }
      />;
    }

    return(
      <div>
        { content }
      </div>
    )
  }
}

$(document).on('turbolinks:load', function(){
  let elements = document.getElementsByClassName('text-quizz-component');
  [].forEach.call(elements, (element) => {
    let textQuizz = element.dataset.element;
    render(<TextQuizzComponent element={ textQuizz } />, element);
  })
})

function  mapStateToProps(state) {
  return {
    unit: state.units.unit,
    editingElement: state.elements.editingElement,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextQuizzComponent);
