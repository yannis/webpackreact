import React from 'react';
import { findDOMNode } from 'react-dom';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import autosize from 'autosize/dist/autosize.js';

class ViewFeedbackComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: null,
      success: false,
      errors: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const node = findDOMNode(this);
    autosize(node.querySelectorAll('textarea'));
  }

  handleChange(event) {
    let input = event.target;
    let text = input.value;
    this.setState({ text });
  }

  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);
    let url = element.links.feedbackAnswers;
    $.ajax({
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: url,
      type: 'post',
      data: {
        feedback_answer: { text: this.state.text }
      }
    }).done( (response) => {
      _this.setState(() => {
        return {
          errors: null,
          success: true
        }
      })
    }).fail((data) => {
      let errors = data.responseJSON.errors;
      _this.setState(() => {
        return {
          errors,
          success: false
        }
      })
    });
  }

  render() {
    let element = this.props.element;
    let block = this.props.block;

    let errors = this.state.errors || {};
    let baseErrors = [];

    if (errors.base) {
      $.each(errors.base, function(i, error) {
        baseErrors.push(<div key={ i } className="alert alert-danger">{error}</div>)
      })
    }

    let text_input_name = "feedback_answer[text]";
    let text_form_group_class = "form-group";
    let text_input_class = "feedback_answer_text form-control";
    let text_input_value = this.props.element ? this.props.element.attributes.descriptionMd : null ;
    let text_input_errors = [];
    if (errors.text) {
      text_form_group_class = text_form_group_class + ' has-danger';
      text_input_class = text_input_class + ' form-control-danger';
      $.each(errors.text, function(i, error) {
        text_input_errors.push(<div key={ i } className="form-control-feedback has-danger">Text {error}</div>)
      })
    }

    let form =  <div>
                  <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
                  <div className='panel panel--form'>
                    <form onSubmit={ this.handleSubmit } onChange={ this.handleChange } className='form-vertical form-full-width'>
                      { baseErrors }
                      <div className='form-group'>
                        { text_input_errors }
                        <textarea name={text_input_name} className='form-control'/>
                      </div>
                      <div className="actions">
                        <button className='btn btn-primary'>Send feedback</button>
                      </div>
                    </form>
                  </div>
                </div>;

    if (this.state.success) {
      form =  <div className="flash-bar success">
                <div className="content">
                  <div className="flash-bar__info">
                    Thank you for your feedback :-)
                  </div>
                </div>
              </div>;
    }

    return (
      <div>
        <BlockAdminButtonComponent block={block} element={element} />
        { form }
      </div>
    );
  }
}


export default ViewFeedbackComponent;
