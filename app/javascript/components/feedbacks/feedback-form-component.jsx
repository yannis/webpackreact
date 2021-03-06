import React from 'react';
import FormErrorsComponent from '../form-errors-component';
import autosize from 'autosize/dist/autosize.js';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';


class FeedbackFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
    // let descriptionHtml = LatexResistentMarkdownConverter.convert(this.props.element ? this.props.element.attributes.descriptionMd : '');
    // let successMessageHtml = LatexResistentMarkdownConverter.convert(this.props.element ? this.props.element.attributes.successMessageMd : '');
    this.setState({
      descriptionHtml: this.props.element ? this.props.element.attributes.descriptionHtml : null,
    })
  }

  setValue(e) {
    if (e.target.id === 'text_quizz_description_md') {
      let descriptionHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState(
        {
          descriptionHtml
        }
      )
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm(e, this.props.url, this.props.method, this.props.success)
  }

  render() {
    let errors = this.props.errors || {};
    let baseErrors = [];

    if (errors.base) {
      $.each(errors.base, function(i, error) {
        baseErrors.push(<div key={ i } className="alert alert-danger">{error}</div>)
      })
    }

    let description_md_input_name = "feedback[description_md]";
    let description_md_input_id = "feedback_description_md";
    let description_md_form_group_class = "form-group";
    let description_md_input_class = "feedback_description_md form-control";
    let description_md_input_value = this.props.element ? this.props.element.attributes.descriptionMd : null ;
    let description_html_input_name = "feedback[description_html]";

    let descriptionField = <MarkdownPreviewTextarea
      label='Text'
      id={description_md_input_id}
      className={description_md_input_class}
      mdName={description_md_input_name}
      htmlName={description_html_input_name}
      value= {description_md_input_value}
      errors={errors.description_md}
      required='true'
    />

    let buttonText = (this.props.element ? 'Update feedback' : 'Add feedback');
    const titleText = this.props.element ? 'Edit “' + this.props.element.attributes.fullTitle + '”' : 'Add feedback';

    return (
      <div className='panel panel--form'>
        <header>
          <h5>{ titleText }</h5>
        </header>
        <form onChange={ this.setValue } onSubmit={ this.submitForm } className='form-vertical form-full-width'>
          { baseErrors }
          { descriptionField }
          <div className="actions">
            <button className='btn btn-primary'>{ buttonText }</button> or <a href='#' className='link' onClick={ this.props.cancelForm }>cancel</a>
          </div>
        </form>
      </div>
    )
  }
}

export default FeedbackFormComponent;
