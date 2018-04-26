import React from 'react';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormMetadataComponent from './form-metadata-component';
import Flash from '../../utilities/flash';

class UnitMetadataComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      errors: null
    }
    this.editElement = this.editElement.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  editElement(e) {
    e.preventDefault();
    this.setState({
      editing: true
    })
  }

  cancelEditing() {
    this.setState({
      editing: false
    })
  }

  submitForm(data) {
    let _this = this;
    let unit = this.props.unit;
    $.ajax({
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      url: unit.links.self,
      type: 'patch',
      data: {
        unit: {
          metadata_md: data.metadataMd,
          metadata_html: data.metadataHtml
        }
      }
    }).done((response, message, xhr) => {
      _this.props.actions.setUnit(response);
      _this.cancelEditing();
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    }).fail((response, message, xhr) => {
      _this.setState({
        errors: response.errors
      })
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    });
  }

  render() {
    const unit = this.props.unit;
    let metadata = (!this.props.metadata || this.props.metadata === '') ? '<p>No metadata yet</p>' : this.props.metadata
    let panelTitle = 'Metadata';
    let panelClass = 'panel panel--text';
    let editLink;

    if (unit.attributes.updatable && !this.state.editing) {
      editLink = <a className="btn btn-primary" onClick={ this.editElement } data-unit_id={ unit.id } data-unit_url={ unit.links.self } href="#" data-block_type='resources'>Edit</a>
    }

    let metadataElement;
    if (this.state.editing) {
      panelTitle = 'Edit metadata';
      panelClass = 'panel panel--form';
      metadataElement = <FormMetadataComponent
        unit={ unit }
        updateMetadata={ this.submitForm }
        cancelEditing={ this.cancelEditing }
        errors={ this.state.errors }
      />;
    } else {
      metadataElement = <div dangerouslySetInnerHTML={{ __html: " " + metadata }} />
    }

    return (
      <div className={panelClass}>
        <header>
          <h5>
            {panelTitle}
          </h5>
          <p className="color-light">This is only shown to teachers and admins.</p>
          { editLink }
        </header>
        { metadataElement }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UnitMetadataComponent);
