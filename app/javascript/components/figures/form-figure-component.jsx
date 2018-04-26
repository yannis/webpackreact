import React from 'react';
import FormErrorsComponent from '../form-errors-component';
import autosize from 'autosize/dist/autosize.js';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';

class FormFigureComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      captionHtml: ''
    }
    this.submitForm = this.submitForm.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
    // let captionHtml = this.props.showPreview(this.props.element ? this.props.element.attributes.captionMd : '');
    this.setState({
      captionHtml: LatexResistentMarkdownConverter.convert(this.props.element ? this.props.element.attributes.captionMd : '')
    })
  }

  setValue(e) {
    if (e.target.id === 'figure_caption_md') {
      this.setState({
        captionHtml: LatexResistentMarkdownConverter.convert(e.target.value)
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm(e, this.props.url, this.props.method, this.props.success)
  }

  render() {
    let errors = this.props.errors || {};

    let caption_md_input_name = "figure[caption_md]";
    let caption_md_input_id = "figure_caption_md";
    let caption_md_form_group_class = "form-group";
    let caption_md_input_class = "figure_caption_md form-control";
    let caption_md_input_value = this.props.element ? this.props.element.attributes.captionMd : null ;
    let caption_html_input_name = "figure[caption_html]";

    let captionField = <MarkdownPreviewTextarea
      label='Caption'
      id={caption_md_input_id}
      className={caption_md_input_class}
      mdName={caption_md_input_name}
      htmlName={caption_html_input_name}
      value= {caption_md_input_value}
      errors={errors.caption_md}
    />

    let max_width_input_name = "figure[max_width]";
    let max_width_input_id = "figure_max_width";
    let max_width_form_group_class = "form-group";
    let max_width_input_class = "figure_max_width form-control";
    let max_width_input_value = this.props.element ? this.props.element.attributes.maxWidth : null ;
    let max_width_input_errors = [];
    if (errors.max_width) {
      max_width_form_group_class = max_width_form_group_class + ' has-danger';
      max_width_input_class = max_width_input_class + ' form-control-danger';
      $.each(errors.max_width, function(i, error) {
        max_width_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }

    let image_attributes_data_input_name = "figure[image_attributes][data]";
    let image_attributes_data_input_id = "figure_image_attributes_data";
    let image_attributes_data_form_group_class = "form-group";
    let image_attributes_data_input_class = "figure_image_attributes_data form-control";
    let image_attributes_data_input_errors = [];
    if (errors.image) {
      image_attributes_data_form_group_class = image_attributes_data_form_group_class + ' has-danger';
      image_attributes_data_input_class = image_attributes_data_input_class + ' form-control-danger';
      $.each(errors.image, function(i, error) {
        image_attributes_data_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }

    let image = this.props.element ? <img src={ this.props.element.attributes.imageThumbUrl } alt={ this.props.element.attributes.captionHtml } /> : null;
    let buttonText = this.props.element ? 'Update figure' : 'Add figure'
    const titleText = this.props.element ? 'Edit “' + this.props.element.attributes.fullTitle + '”' : 'Add figure';

    const toolbar = {
      options: ['inline', 'link'],
      inline: {
        options: ['bold', 'italic'],
      },
    }
    return (
      <div className='panel panel--form'>
        <header>
          <h5>{ titleText }</h5>
        </header>
        <form onChange={ this.setValue } onSubmit={ this.submitForm } className='form-vertical form-full-width'>
          { captionField }
          <input type="hidden" name={ caption_html_input_name } defaultValue={ this.state.captionHtml } />
          <div className={ max_width_form_group_class }>
            <label className='form-control-label' htmlFor={ max_width_input_id } >Max width (px)</label>
            <input type="number" id={ max_width_input_id } name={ max_width_input_name } className={ max_width_input_class } defaultValue={ max_width_input_value } />
            { max_width_input_errors }
          </div>
          { image }
          <div className={ image_attributes_data_form_group_class }>
            <label className='form-control-label' htmlFor={ image_attributes_data_input_id } >Image <span className='red_star'>*</span></label>
            <input type="file" id={ image_attributes_data_input_id } name={ image_attributes_data_input_name } className={ image_attributes_data_input_class }  />
            { image_attributes_data_input_errors }
          </div>
          <div className="actions">
            <button className='btn btn-primary'>{ buttonText }</button> or <a href='#' className='link' onClick={ this.props.cancelForm }>cancel</a>
          </div>
        </form>
      </div>
    )
  }
}

export default FormFigureComponent;
