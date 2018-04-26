import React from 'react';
import Flash from '../../utilities/flash';
import moment from 'moment';

class NoteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this note?")) {
      let _this = this;
      $.ajax({
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        url: this.props.url,
        type: 'delete',
      }).done( (response, message, xhr) => {
        let note = response.data;
        _this.props.handleRemoveNote(this.props.note.id);
        Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      }).fail((response, message, xhr) => {
        let errors = response.responseJSON.errors;
        Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      });
    }
  }

  render() {
    const note = this.props.note;
    const text = note.attributes.text;
    const createdAt = moment(note.attributes.createdAt).fromNow();
    const updatedAt = moment(note.attributes.updatedAt).fromNow();
    let deleteLink;
    if (note.attributes.destroyable) {
      deleteLink = <a href='#' className='btn btn-secondary' onClick={this.handleDelete} >Delete note</a>
    }
    return(
      <div className="card learner-notes-note">
        <div className="card-header">
          <small className='color-light'>Posted {createdAt} by {note.attributes.authorFullName} on <a href={note.links.notable} target='_blank'>{note.attributes.notableType}</a></small>
        </div>
        <div className="card-body">
          <p>
            { text }
          </p>
        </div>
        <div className="card-footer">
          {deleteLink}
        </div>
      </div>
    )
  }
}

export default NoteComponent;
