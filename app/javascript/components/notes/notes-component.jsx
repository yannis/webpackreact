import React from 'react';
import Note from './note-component';
import AddNote from './add-note-component';
import Flash from '../../utilities/flash';
import _ from 'lodash';
class NotesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notes: [],
      addNoteErrors: {},
    }
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
  }

  componentDidMount() {
    let _this = this;
    let url = this.props.url;
    $.ajax({
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      url,
      type: 'get'
    }).done((response, message, xhr) => {
      let notes = [];
      response.data.map(function (note, index) {
        notes.push(note)
      })
      _this.setState({
        notes,
        loading: false
      })
    }).fail((data, message, xhr) => {
      _this.setState({
        errors: data.errors
      })
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    });
  }

  handleAddNote(note) {
    this.setState({
      notes: [note].concat(this.state.notes)
    })
  }

  handleRemoveNote(noteId) {
    let notes = _.remove(this.state.notes, (note) => {
      return note.id != noteId;
    });
    this.setState({
      notes
    })
  }

  render() {
    let content;
    if (this.state.loading) {
      content = <img src="/assets/loading.gif" />;
    } else {
      if (this.state.notes.length > 0) {
        content = this.state.notes.map((note, index) => {
          return <Note key={ note.id } note={ note } url={ this.props.url + '/' + note.id } handleRemoveNote={ this.handleRemoveNote }/>
        });
      }
    }
    return(
      <div className="card">
        <div className="card-header">
          <h4>Notes</h4>
        </div>
        <div className="card-body">
          <AddNote handleAddNote={ this.handleAddNote } url={ this.props.url } />
          { content }
        </div>
      </div>
    )
  }
}

export default NotesComponent;
