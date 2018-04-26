import React from 'react';
import { findDOMNode, render } from 'react-dom';
import FormErrorsComponent from './form-errors-component';
import autosize from 'autosize/dist/autosize.js';
import _ from 'lodash';

class MarkdownPreviewTextareaControlled extends React.Component {

  constructor(props) {
    super(props);
    // this.loadSteps = this.loadSteps.bind(this);
    this.state = {
      preview: false,
    };
    this.setPreview = this.setPreview.bind(this);
  }

  componentDidMount() {
    autosize(findDOMNode(this).querySelectorAll('textarea'));
  }

  componentDidUpdate() {
    Prism.highlightAll();
    autosize(findDOMNode(this).querySelectorAll('textarea'));
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  setPreview(e) {
    e.preventDefault();
    let preview = e.target.dataset.preview === 'preview';
    this.setState({
      preview
    })
  }

  render() {
    let star;
    let required = this.props.required && this.props.required === 'true';
    if (required) {
      star = <span className='red_star'> *</span>
    }

    let classes = this.props.className;
    let labelClassName = this.props.labelClassName;

    let errors = this.props.errors;
    let errorElements = [];
    if (errors && !_.isEmpty(errors)) {
      classes = classes + ' has-danger is-invalid';
      $.each(errors, (name, errors) => {
        $.each(errors, (i, error) => {
          errorElements.push(<div key={ name + i } className="form-control-feedback">Text {error}</div>)
        })
      })
    }

    let area;
    let previewLink;
    if (this.state.preview) {
      previewLink = <a href='#' className='link' data-preview='write' onClick={this.setPreview}>Write</a>;
      area = <div className='markdown-preview'>
        <div dangerouslySetInnerHTML={{__html: this.props.valueHtml }} />
      </div>;
    } else {
      previewLink = <a href='#' className='link' data-preview='preview' onClick={this.setPreview}>Preview</a>;
      area = <div>
        <textarea
          id={ this.props.id }
          className={ classes }
          name={ this.props.mdName }
          value={ this.props.valueMd }
          required={ required }
          onChange={this.props.onChange}
        />
        { errorElements }
      </div>
    }

    return(
      <div className='form-group markdown-preview-group'>
        <label htmlFor={ this.props.id } className={ labelClassName }>{ this.props.label }{star} (suports markdown)</label>
        { previewLink }
        {area}
      </div>
    )
  }
}

export default MarkdownPreviewTextareaControlled;
