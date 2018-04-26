import React from 'react';
import { findDOMNode, render } from 'react-dom';
import FormErrorsComponent from './form-errors-component';
import autosize from 'autosize/dist/autosize.js';
import LatexResistentMarkdownConverter from '../utilities/latex-resistent-markdown-converter.js';

class MarkdownPreviewTextarea extends React.Component {

  constructor(props) {
    super(props);
    // this.loadSteps = this.loadSteps.bind(this);
    this.state = {
      preview: false,
      value: this.props.value,
      htmlValue: LatexResistentMarkdownConverter.convert(this.props.value ? this.props.value : '')
    };
    this.setValue = this.setValue.bind(this);
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

  setValue(e) {
    this.setState({
      value: e.target.value,
      htmlValue: LatexResistentMarkdownConverter.convert(e.target.value)
    })
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

    let errors = [];
    if (errors.description_md) {
      classes = classes + ' has-danger';
      $.each(errors.description_md, (i, error) => {
        errors.push(<div key={i} className="form-control-feedback">{error}</div>)
      })
    }

    let area;
    let previewLink;
    if (this.state.preview) {
      previewLink = <a href='#' className='link' data-preview='write' onClick={this.setPreview}>Write</a>;
      area = <div className='markdown-preview'>
        <div dangerouslySetInnerHTML={{ __html: this.state.htmlValue }} />
        <input type="hidden" name={this.props.htmlName} defaultValue={this.state.htmlValue} />
        <input type="hidden" name={this.props.mdName} defaultValue={this.state.value} />
      </div>;
    } else {
      previewLink = <a href='#' className='link' data-preview='preview' onClick={this.setPreview}>Preview</a>;
      area = <div>
        <textarea
          id={this.props.id}
          className={this.props.className}
          name={this.props.mdName}
          defaultValue={this.state.value}
          required={required}
          onChange={this.setValue}
        />
        {errors}
        <input type="hidden" name={this.props.htmlName} defaultValue={this.state.htmlValue} />
      </div>
    }

    return (
      <div className='form-group markdown-preview-group'>
        <label htmlFor={this.props.id} className={labelClassName}>{this.props.label}{star} (suports markdown)</label>
        {previewLink}
        {area}
      </div>
    )
  }
}

document.addEventListener("turbolinks:load", () => {
  let textareas = document.getElementsByClassName('markdown-preview-textarea');
  [].forEach.call(textareas, (textarea) => {
    let label = textarea.dataset.label;
    let labelClassName = textarea.dataset.labelClass;
    let id = textarea.dataset.id;
    let className = textarea.dataset.class;
    let mdName = textarea.dataset.mdName;
    let htmlName = textarea.dataset.htmlName;
    let value = textarea.dataset.value
    let errors = textarea.dataset.errors;
    let required = textarea.dataset.required;
    render(<MarkdownPreviewTextarea
      label={label}
      labelClassName={labelClassName}
      id={id}
      className={className}
      mdName={mdName}
      htmlName={htmlName}
      value={value}
      errors={errors}
      required={required}
    />, textarea);
  })
})

export default MarkdownPreviewTextarea;