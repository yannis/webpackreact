import React from 'react';
import { findDOMNode } from 'react-dom';
import FormErrorsComponent from '../form-errors-component';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';
import autosize from 'autosize/dist/autosize.js';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';

class FormPageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      descriptionHtml: '',
      timeLeft: 0,
      timer: null
    }
    this.submitForm = this.submitForm.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.autosaveForm = this.autosaveForm.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
    this.startTimer();
    if (this.props.element) {
      let descriptionHtml = LatexResistentMarkdownConverter.convert(this.props.element.attributes.descriptionMd);
      this.setState({
        descriptionHtml
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm(e, this.props.url, this.props.method, this.props.success)
  }

  autosaveForm() {
    const node = findDOMNode(this);
    const form = node.querySelector('form');
    this.props.autosaveForm(form, this.props.url, this.props.method)
  }

  startTimer() {
    const time = 60;
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      var timeLeft = this.state.timeLeft - 1;

      if (timeLeft == 0) {
        timeLeft = time;
        clearInterval(timer);
        this.autosaveForm();
        this.startTimer();
      }
      this.setState({
        timeLeft
      })
    }, 1000)
    this.setState({
      timeLeft: time,
      timer
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

    let description_md_input_name = "page[description_md]";
    let description_md_input_id = "page_description_md";
    let description_md_input_class = "page_description_md form-control";
    let description_md_input_value = this.props.element ? this.props.element.attributes.descriptionMd : null ;
    let description_html_input_name = "page[description_html]";

    let descriptionField = <MarkdownPreviewTextarea
      label='Text'
      labelClassName='col-form-label'
      id={description_md_input_id}
      className={description_md_input_class}
      mdName={description_md_input_name}
      htmlName={description_html_input_name}
      value= {description_md_input_value}
      errors={errors.description_md}
      required='true'
    />

    const buttonText = this.props.element ? 'Update page' : 'Add page';
    const titleText = this.props.element ? 'Edit “' + this.props.element.attributes.fullTitle + '”' : 'Add page';

    return (
      <div className='panel panel--form'>
        <header>
          <h5>{ titleText }</h5>
        </header>
        <form onSubmit={ this.submitForm } className='form'>
          { descriptionField }
          <div className="actions">
            <p>
              Autosaving in { this.state.timeLeft } seconds.
            </p>
            <input type='submit' className='btn btn-primary' value={ buttonText } /> or <a href='#' className='link' onClick={ this.props.cancelForm }>cancel</a>
          </div>
        </form>
      </div>
    )
  }
}

export default FormPageComponent;
