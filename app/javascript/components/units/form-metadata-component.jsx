import React from 'react';
import FormErrorsComponent from '../form-errors-component';
import autosize from 'autosize/dist/autosize.js';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';

class FormMetadataComponent extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.setValue = this.setValue.bind(this);
    this.setHtml = this.setHtml.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
  }

  setHtml(markdown) {
    if (markdown) {
      return LatexResistentMarkdownConverter.convert(markdown);
    }
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
    let metadataMd = this.props.unit.attributes.metadataMd;
    let metadataHtml = this.setHtml(metadataMd);
    this.setState({
      metadataMd,
      metadataHtml
    })
  }

  setValue(e) {
    if (e.target.id === 'unit_metadata_md') {
      let metadataMd = e.target.value;
      let metadataHtml = this.setHtml(metadataMd);
      this.setState({
        metadataMd,
        metadataHtml
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    let form = e.target;
    this.props.updateMetadata({
      metadataMd: this.state.metadataMd,
      metadataHtml: this.state.metadataHtml
    });
  }

  cancelEditing(e) {
    e.preventDefault();
    this.props.cancelEditing();
  }

  render() {
    const unit = this.props.unit;
    let errors = this.props.errors || {};

    let baseErrors = [];

    if (errors.base) {
      $.each(errors.base, function(i, error) {
        baseErrors.push(<div key={ i } className="alert alert-danger">{error}</div>)
      })
    }

    let metadata_md_input_name = "unit[metadata_md]";
    let metadata_md_input_id = "unit_metadata_md";
    let metadata_md_form_group_class = "form-group";
    let metadata_md_input_class = "unit_metadata_md form-control";
    let metadata_md_input_value = unit.attributes.metadataMd ;

    let metadata_html_input_name = "unit[metadata_html]";

    let descriptionField = <MarkdownPreviewTextarea
      label='Metadata'
      id={metadata_md_input_id}
      className={metadata_md_input_class}
      mdName={metadata_md_input_name}
      htmlName={metadata_html_input_name}
      value= {metadata_md_input_value}
      errors={errors.metadata_md}
    />

    const buttonText = unit.attributes.metadataMd != '' ? 'Update metadata' : 'Add metadata';

    return (
      <form onChange={ this.setValue } onSubmit={ this.submitForm } className='form-vertical form-full-width'>
        { baseErrors }
        { descriptionField }
        <div>
          <input type='submit' className='btn btn-primary' value={ buttonText } /> or <a href='#' onClick={ this.cancelEditing }>cancel</a>
        </div>
      </form>
    )
  }
}

export default FormMetadataComponent;
