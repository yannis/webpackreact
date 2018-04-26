import React from 'react';
import FormErrorsComponent from '../form-errors-component';
import FormAnswersComponent from '../answers/answers-form-component';
import autosize from 'autosize/dist/autosize.js';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';

class FormQuizzMultipleChoiceComponent extends React.Component {

  constructor(props) {
    super(props);
    let answers = [];
    if (props.element) {
      answers = props.element.relationships.answers.data.sort((a, b) => {
        if (a.position != b.position){
          return a.position - b.position;
        } else {
          return a.id - b.id;
        }
      })
    }
    this.state = {
      descriptionHtml: '',
      successMessageHtml: '',
      answers
    }
    this.submitForm = this.submitForm.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
    // let descriptionHtml = LatexResistentMarkdownConverter.convert(this.props.element ? this.props.element.attributes.descriptionMd : '');
    // let successMessageHtml = LatexResistentMarkdownConverter.convert(this.props.element ? this.props.element.attributes.successMessageMd : '');
    this.setState({
      descriptionHtml: this.props.element ? this.props.element.attributes.descriptionHtml : null,
      successMessageHtml: this.props.element ? this.props.element.attributes.successMessageHtml : null
    })
  }

  setValue(e) {
    if (e.target.id === 'multiple_choice_quizz_description_md') {
      let descriptionHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState(
        {
          descriptionHtml
        }
      )
    } else if (e.target.id === 'multiple_choice_quizz_success_message_md') {
      let successMessageHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState(
        {
          successMessageHtml
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

    let description_md_input_name = "multiple_choice_quizz[description_md]";
    let description_md_input_id = "multiple_choice_quizz_description_md";
    let description_md_form_group_class = "form-group";
    let description_md_input_class = "multiple_choice_quizz_description_md form-control";
    let description_md_input_value = this.props.element ? this.props.element.attributes.descriptionMd : null ;
    let description_html_input_name = "multiple_choice_quizz[description_html]";

    let descriptionField = <MarkdownPreviewTextarea
      label='Description'
      id={description_md_input_id}
      className={description_md_input_class}
      mdName={description_md_input_name}
      htmlName={description_html_input_name}
      value= {description_md_input_value}
      errors={errors.description_md}
      required='true'
    />

    let success_message_md_input_name = "multiple_choice_quizz[success_message_md]";
    let success_message_md_input_id = "multiple_choice_quizz_success_message_md";
    let success_message_md_form_group_class = "form-group";
    let success_message_md_input_class = "multiple_choice_quizz_success_message_md form-control";
    let success_message_md_input_value = this.props.element ? this.props.element.attributes.successMessageMd : null ;
    let success_message_html_input_name = "multiple_choice_quizz[success_message_html]";

    let successField = <MarkdownPreviewTextarea
      label='Success Message'
      id={success_message_md_input_id}
      className={success_message_md_input_class}
      mdName={success_message_md_input_name}
      htmlName={success_message_html_input_name}
      value= {success_message_md_input_value}
      errors={errors.success_message_md}
    />

    const buttonText = (this.props.element ? 'Update quizz' : 'Add quizz') + ' (multiple choice)';
    const titleText = this.props.element ? 'Edit “' + this.props.element.attributes.fullTitle + '”' : 'Add quizz (multiple choice)';

    return (
      <div className='panel panel--form'>
        <header>
          <h5>{ titleText }</h5>
        </header>
        <form onChange={ this.setValue } onSubmit={ this.submitForm } className='form-vertical form-full-width'>
          { baseErrors }
          { descriptionField }
          { successField }
          <p className="form-text text-muted">
            Message shown when the quizz is successfully answered
          </p>
          <input type="hidden" name={ success_message_html_input_name } defaultValue={ this.state.successMessageHtml } />
          <h4>Answers</h4>
          <FormAnswersComponent
            objectType='multiple_choice_quizz'
            answers={ this.state.answers }
            errors={errors.answers }
           />
           <div className="actions">
             <button className='btn btn-primary'>{ buttonText }</button> or <a href='#' className='link' onClick={ this.props.cancelForm }>cancel</a>
           </div>
        </form>
      </div>
    )
  }
}

export default FormQuizzMultipleChoiceComponent;
