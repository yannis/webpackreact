import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';
import autosize from 'autosize/dist/autosize.js';
import Flash from '../../../utilities/flash';
import MarkdownPreviewTextareaControlled from '../../markdown-preview-textarea-controlled-component';
import LatexResistentMarkdownConverter from '../../../utilities/latex-resistent-markdown-converter.js';

// import _ from 'lodash';

class LearnQuestionFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.question ? props.question.attributes.text : '',
      infoMd: props.question ? props.question.attributes.infoMd : '',
      disabled: false,
      errors: []
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const node = findDOMNode(this);
    autosize(node.querySelectorAll('textarea'));
    if (this.props.question) {
      let infoHtml = LatexResistentMarkdownConverter.convert(this.props.question.attributes.infoMd);
      this.setState({
        infoHtml
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    const _this = this;
    this.setState({
      disabled: true
    })
    $.ajax({
      url: this.props.url,
      method: this.props.question ? 'PUT' : 'POST',
      data: {
        question: {
          text: this.state.text,
          info_md: this.state.infoMd,
          info_html: this.state.infoHtml
        }
      }
    }).done((response, message, xhr) => {
      if (_this.props.question) {
        _this.props.actions.updateQuestion(response);
        _this.props.actions.cancelEditQuestion(response);
      } else {
        _this.props.actions.setIncludedQuestionAnswers(response);
        _this.props.actions.setIncludedUsers(response);
        _this.props.actions.addQuestion(response);
        $('.modal').modal('hide');
        _this.setState({
          errors: [],
          disabled: false,
          text: '',
          infoMd: '',
          infoHtml: ''
        })
      }
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    }).fail((data) => {
      if (data.responseJSON && data.responseJSON.errors) {
        let state = {
          disabled: false
        }
        _this.setState({
          errors: data.responseJSON.errors,
          disabled: false
        })
      }
      Flash.handleFlashMessagesHeader(window.flashDiv, data);
    })
  }

  handleChange(e) {
    e.preventDefault();
    let target = e.target;
    let name = target.dataset.name;
    let value = target.value;
    let data = {
      errors: [],
      disabled: false
    };
    data[name] = value;
    this.setState(data);
  }

  handleChange(e) {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains('question_info_md')) {
      let infoHtml = LatexResistentMarkdownConverter.convert(target.value);
      this.setState({
        disabled: false,
        errors: [],
        infoMd: target.value,
        infoHtml
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
    this.props.actions.editQuestion(null);
  }

  render() {
    const errors = this.state.errors;

    let text_input_name = "question[text]";
    let text_input_id = "question" + (this.props.questionId || '') + "-text";
    let text_input_class = "question_text form-control";
    let errorsText = [];
    if (errors.text) {
      text_input_class = text_input_class + ' is-invalid';
      $.each(errors.text, (i, error) => {
        errorsText.push(<div key={i} className="invalid-feedback">{error}</div>)
      })
    }

    let info_md_input_name = "question[info_md]";
    let info_md_input_id = "question" + (this.props.questionId || '') + "-info";
    let info_md_input_class = "question_info_md form-control";
    let info_html_input_name = "question[info_html]";
    let errorsInfo = [];
    if (errors.info) {
      info_md_input_class = info_md_input_class + ' is-invalid';
      $.each(errors.info, (i, error) => {
        errorsInfo.push(<div key={i} className="invalid-feedback">{error}</div>)
      })
    }

    let infoField = <MarkdownPreviewTextareaControlled
      label='Additional info'
      labelClassName='col-form-label'
      id={info_md_input_id}
      className={info_md_input_class}
      mdName={info_md_input_name}
      htmlName={info_html_input_name}
      valueMd={this.state.infoMd}
      valueHtml={this.state.infoHtml}
      errors={errorsInfo}
      required='false'
      onChange={this.handleChange}
    />

    let submitText = 'Post question';
    let submitingText = 'Posting question';
    let cancelButton = <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>;

    if (this.props.question) {
      submitText = 'Update question';
      submitingText = 'Updating question';
      cancelButton = <button type="button" className="btn btn-secondary" onClick={this.handleCancel}>Cancel</button>;
    }

    return (
      <form id="learn-question-form" onSubmit={this.submitForm}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor={text_input_id}>Question<span className="red_star">*</span></label>
          <div className="col-sm-9">
            <input autoFocus="autofocus" id={text_input_id} className={text_input_class} name={text_input_name} type="text" data-name='text' value={this.state.text} onChange={this.handleChange} />
            { errorsText }
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="question_info">Additional info</label>
          <div className="col-sm-9">
            {infoField}
            { errorsInfo }
          </div>
        </div>
        <div className="modal-footer">
          <input type="submit" name="commit" value={submitText} className="btn btn-primary" data-disable-with={submitingText} disabled={this.state.disabled} />
          {cancelButton}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    forms: state.forms,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnQuestionFormComponent);
