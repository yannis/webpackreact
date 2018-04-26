import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import MarkdownPreviewTextareaControlled from '../../markdown-preview-textarea-controlled-component';
import LatexResistentMarkdownConverter from '../../../utilities/latex-resistent-markdown-converter.js';
import autosize from 'autosize/dist/autosize.js';
import Flash from '../../../utilities/flash';
import _ from 'lodash';

class LearnQuestionAnswerFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textMd: props.questionAnswer ? props.questionAnswer.attributes.textMd : '',
      errors: [],
      disabled: false
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const node = findDOMNode(this);
    autosize(node.querySelectorAll('textarea'));
    if (this.props.questionAnswer) {
      let textHtml = LatexResistentMarkdownConverter.convert(this.props.questionAnswer.attributes.textMd);
      this.setState({
        textHtml
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({
      disabled: true
    })
    $.ajax({
      url: this.props.url,
      method: this.props.questionAnswer ? 'PUT' : 'POST',
      data: {
        question_answer: {
          text_md: this.state.textMd,
          text_html: this.state.textHtml,
        }
      }
    }).done((response, message, xhr) => {
      if (this.props.questionAnswer) {
        this.props.actions.updateQuestionAnswer(response);
        this.props.actions.cancelEditQuestionAnswer(response);
      } else {
        this.props.actions.setIncludedQuestionAnswers(response);
        this.props.actions.setIncludedUsers(response);
        this.props.actions.addQuestionAnswer(response);
        this.setState({
          disabled: false,
          textMd: '',
          textHtml: '',
        })
      }
      this.props.actions.setIncludedQuestions(response);
      this.props.actions.showQuestionAnswerForm({ questionId: null });
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    }).fail((data) => {
      this.setState({
        errors: data.responseJSON.errors,
        disabled: false
      })
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  handleChange(e) {
    e.preventDefault();
    this.props.actions.clearErrors(name);
    let target = e.target;
    if (target.classList.contains('question_answer_text_md')) {
      let textHtml = LatexResistentMarkdownConverter.convert(target.value);
      this.setState({
        disabled: false,
        errors: [],
        textMd: target.value,
        textHtml
      })
    } else {
      let name = target.dataset.name;
      let value = target.value;
      let data = {
        errors: [],
        disabled: false
      };
      data[name] = value;
      this.setState(data);
    }
  }

  handleCancel(e) {
    e.preventDefault();
    if (this.props.questionAnswer) {
      this.props.actions.editQuestionAnswer(null);
    } else {
      this.setState({
        disabled: false,
        errors: [],
        textMd: '',
        textHtml: ''
      })
      this.props.actions.showQuestionAnswerForm({ questionId: null });
    }
  }

  render() {
    const errors = this.state.errors;

    let text_md_input_name = "question_answer[text_md]";
    let text_md_input_id = _.compact(['question', this.props.questionId, 'answer', this.props.questionAnswer ? this.props.questionAnswer.id : null, 'text' ]).join('-');
    let text_md_input_class = "question_answer_text_md form-control";
    let text_html_input_name = "question_answer[text_html]";

    let textField = <MarkdownPreviewTextareaControlled
      label='Your answer'
      labelClassName='col-form-label'
      id={text_md_input_id}
      className={text_md_input_class}
      mdName={text_md_input_name}
      htmlName={text_html_input_name}
      valueMd={this.state.textMd}
      valueHtml={this.state.textHtml}
      onChange={this.handleChange}
      errors={errors}
      required='true'
    />

    let submitText = 'Post answer';
    let submitingText = 'Posting answer';
    let avatarUrl = this.props.currentUserAvatarUrl;
    let cancelLink = <a href='#' className='link' onClick={this.handleCancel}>Cancel</a>;

    if (this.props.questionAnswer) {
      submitText = 'Update answer';
      submitingText = 'Updating answer';
      avatarUrl = this.props.user.links.avatarMedium;
    }

    return (
      <div className="answer-question d-flex">
        <img className="avatar" src={ avatarUrl } />
        <form className='learn-answer-form' onSubmit={this.submitForm} onChange={this.handleChange}>
          { textField }
          <div className='buttons float-right'>
            <input type="submit" name="commit" value={submitText} className="btn btn-secondary btn-sm" data-disable-with={submitingText} disabled={this.state.disabled} /> or {cancelLink}
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LearnQuestionAnswerFormComponent);