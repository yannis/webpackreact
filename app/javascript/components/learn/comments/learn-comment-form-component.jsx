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

class LearnCommentFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textMd: props.comment ? props.comment.attributes.textMd : '',
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
    if (this.props.comment) {
      let textHtml = LatexResistentMarkdownConverter.convert(this.props.comment.attributes.textMd);
      this.setState({
        textHtml
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
      method: this.props.comment ? 'PUT' : 'POST',
      data: {
        comment: {
          text_md: this.state.textMd,
          text_html: this.state.textHtml
        }
      }
    }).done((response, message, xhr) => {
      if (_this.props.comment) {
        _this.props.actions.updateComment(response);
        _this.props.actions.cancelEditComment(response);
      } else {
        _this.props.actions.setIncludedUsers(response);
        _this.props.actions.addComment(response);
        $('.modal').modal('hide');
        _this.setState({
          errors: [],
          disabled: false,
          textMd: '',
          textHtml: ''
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
    if (target.classList.contains('comment_text_md')) {
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
    this.props.actions.editComment(null);
  }

  render() {
    const errors = this.state.errors;

    let text_md_input_name = "comment[text_md]";
    let text_md_input_id = "comment" + (this.props.commentId || '') + "-text";
    let text_md_input_class = "comment_text_md form-control";
    let text_html_input_name = "comment[text_html]";
    let errorsText = [];
    if (errors.text) {
      text_md_input_class = text_md_input_class + ' is-invalid';
      $.each(errors.text, (i, error) => {
        errorsText.push(<div key={i} className="invalid-feedback">{error}</div>)
      })
    }

    let textField = <MarkdownPreviewTextareaControlled
      label='Comment'
      labelClassName='col-form-label'
      id={text_md_input_id}
      className={text_md_input_class}
      mdName={text_md_input_name}
      htmlName={text_html_input_name}
      valueMd={this.state.textMd}
      valueHtml={this.state.textHtml}
      errors={errorsText}
      required='false'
      onChange={this.handleChange}
    />

    let submitText = 'Post comment';
    let submitingText = 'Posting comment';
    let cancelButton = <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>;

    if (this.props.comment) {
      submitText = 'Update comment';
      submitingText = 'Updating comment';
      cancelButton = <button type="button" className="btn btn-secondary" onClick={this.handleCancel}>Cancel</button>;
    }

    return (
      <form id="learn-comment-form" onSubmit={this.submitForm}>
        <div className="form-group">
          {textField}
          { errorsText }
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

export default connect(mapStateToProps, mapDispatchToProps)(LearnCommentFormComponent);
