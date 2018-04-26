import React from 'react';
import FormErrorsComponent from '../form-errors-component';

class ResourceFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm(e, this.props.url, this.props.method, this.props.success)
  }

  render() {
    let errors = this.props.errors || {};
    let resource_form_group_class = "form-group is-x-large";

    let resource_title_name = "resource[title]";
    let resource_title_id = "resource_title";
    let resource_title_class = "resource_title form-control";
    let resource_title_value = this.props.element ? this.props.element.attributes.title : null ;
    let resource_title_errors = [];
    if (errors.title) {
      resource_form_group_class = resource_form_group_class + ' has-danger';
      resource_title_class = resource_title_class + ' form-control-danger';
      $.each(errors.title, function(i, error) {
        resource_title_errors.push(<div key={ i } className="form-control-feedback has-danger">{error}</div>)
      })
    }

    let document_form_group_class = "form-group";

    let resource_document_name = "resource[document]";
    let resource_document_id = "resource_document";
    let resource_document_class = "resource_document form-control-file";
    let resource_document_errors = [];
    if (errors.document) {
      resource_document_class = resource_document_class + ' form-control-danger';
      $.each(errors.document, function(i, error) {
        resource_document_errors.push(<div key={ i } className="form-control-feedback has-danger">{error}</div>)
      })
    }

    let resource_url_name = "resource[url]";
    let resource_url_id = "resource_url";
    let resource_url_class = "resource_url form-control";
    let resource_url_value = this.props.element ? this.props.element.attributes.url : null;
    let resource_url_errors = [];
    if (errors.url) {
      resource_url_class = resource_url_class + ' form-control-danger';
      $.each(errors.url, function(i, error) {
        resource_url_errors.push(<div key={ i } className="form-control-feedback has-danger">{error}</div>)
      })
    }

    let resource_s3_key_name = "resource[s3_key]";
    let resource_s3_key_id = "resource_s3_key";
    let resource_s3_key_class = "resource_s3_key form-control";
    let resource_s3_key_value = this.props.element ? this.props.element.attributes.s3Key : null;
    let resource_s3_key_errors = [];
    if (errors.s3_key) {
      resource_s3_key_class = resource_s3_key_class + ' form-control-danger';
      $.each(errors.s3_key, function(i, error) {
        resource_s3_key_errors.push(<div key={ i } className="form-control-feedback has-danger">{error}</div>)
      })
    }

    let resource_open_blank_name = "resource[open_blank]";
    let resource_open_blank_id = "resource_open_blank";
    let resource_open_blank_class = "resource_open_blank form-check-input";
    let resource_open_blank_checked = this.props.element ? this.props.element.attributes.openBlank : false;
    let resource_open_blank_errors = [];
    if (errors.open_blank) {
      resource_open_blank_class = resource_open_blank_class + ' form-control-danger';
      $.each(errors.open_blank, function(i, error) {
        resource_open_blank_errors.push(<div key={ i } className="form-control-feedback has-danger">{error}</div>)
      })
    }

    let document = this.props.element && this.props.element.attributes.documentUrl ? <p>Current file: <a href={this.props.element.attributes.documentUrl} target='_blank'>{ this.props.element.attributes.filename }</a></p> : null;
    let buttonText = this.props.element ? 'Update resource' : 'Add resource'

    return (
      <form onSubmit={ this.submitForm } className='form'>
        <div className={ resource_form_group_class }>
          <label className='form-control-label col-form-label' htmlFor={ resource_title_id } >Title (optional)</label>
          <input type="text" id={ resource_title_id } name={ resource_title_name } className={ resource_title_class } defaultValue={ resource_title_value } />
          { resource_title_errors }
        </div>
        <div className={ resource_form_group_class }>
          <div className={ resource_form_group_class }>
            { document }
            <label className='form-control-label col-form-label' htmlFor={ resource_document_id } >Choose a file</label>
            <input type="file" id={ resource_document_id } name={ resource_document_name } className={ resource_document_class } />
            { resource_document_errors }
          </div>
          <div className={ resource_form_group_class }>
            <label className='form-control-label col-form-label' htmlFor={ resource_url_id } >…or enter a URL</label>
            <input type="url" id={ resource_url_id } name={ resource_url_name } className={ resource_url_class } defaultValue={ resource_url_value } />
            { resource_url_errors }
          </div>
          <div className={ resource_form_group_class }>
            <label className='form-control-label col-form-label' htmlFor={ resource_s3_key_id } >…or enter the S3 Key of a file stored in the {this.props.resourcesBucket} bucket</label>
            <input type="text" id={ resource_s3_key_id } name={ resource_s3_key_name } className={ resource_s3_key_class } defaultValue={ resource_s3_key_value } />
            { resource_s3_key_errors }
          </div>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="hidden" name={ resource_open_blank_name } value={ false } />
            <input type="checkbox" className={ resource_open_blank_class } name={ resource_open_blank_name } defaultChecked={ resource_open_blank_checked } defaultValue={ true } /> Open URL in a new tab
          </label>
          { resource_open_blank_errors }
        </div>
        <div className="buttons">
          <button className='btn btn-primary'>{ buttonText }</button> <a href='#' className='btn btn-secondary' onClick={ this.props.cancelForm }>Cancel</a>
        </div>
      </form>
    )
  }
}

export default ResourceFormComponent;
