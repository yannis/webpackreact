import React from 'react';
import Note from './note-component';
import AddNote from './add-note-component';
import Flash from '../../utilities/flash';
import autosize from 'autosize/dist/autosize.js';

class NotesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  componentDidUpdate() {
    $('.invalid-feedback').show();
  }

  handleSubmit(e) {
    e.preventDefault();
    let _this = this;
    this.setState({
      loading: true
    })
    const url = this.props.url;
    let data = {
      note: {
        text: this.state.text
      }
    };

    $.ajax({
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: url,
      type: 'post',
      data,
    }).done( (response, message, xhr) => {
      let note = response.data;
      _this.props.handleAddNote(note);
      _this.setState({
        text: '',
        loading: false
      })
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    }).fail((response, message, xhr) => {
      let errors = response.responseJSON.errors;
      _this.setState({
        errors: errors,
        loading: false
      })
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    });
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
      errors: {}
    })
  }

  render() {
    const errors = this.state.errors;
    let baseErrors = [];
    let textErrors = [];

    if (errors.base) {
      $.each(errors.base, function(i, error) {
        baseErrors.push(<div key={ i } className="invalid-feedback">{error}</div>)
      })
    }

    if (errors.text) {
      $.each(errors.text, function(i, error) {
        textErrors.push(<div key={ i } className="invalid-feedback">Text {error}</div>)
      })
    }

    return(
      <form onSubmit={ this.handleSubmit }>
        { baseErrors }
        <div className="form-group">
          <textarea id='learner-notes-text' className='form-control' onChange={this.handleTextChange} value={ this.state.text }>
          </textarea>
          { textErrors }
        </div>
        <div className="actions">
          <button className='btn btn-primary' disabled={ this.state.loading } >Add note</button>
        </div>
      </form>
    )
  }
}

export default NotesComponent;
