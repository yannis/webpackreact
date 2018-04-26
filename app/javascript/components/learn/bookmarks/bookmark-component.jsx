import React from 'react';
import Flash from '../../../utilities/flash';

class BookmarkComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarkId: props.bookmarkId,
      url: props.bookmarkId ? `${props.url}/${props.bookmarkId}` : props.url
    }
    this.createBookmark = this.createBookmark.bind(this)
    this.destroyBookmark = this.destroyBookmark.bind(this)
  }

  createBookmark(e) {
    e.preventDefault();
    const _this = this;
    $.ajax({
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      url: this.state.url,
      type: 'post',
      dataType: 'json',
    }).done((response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      _this.setState({
        bookmarkId: response.data.id,
        url: response.data.links.self
      })
    }).fail((data, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    });
  }

  destroyBookmark(e) {
    e.preventDefault();
    const _this = this;

    $.ajax({
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      url: this.state.url,
      type: 'DELETE',
      dataType: 'json',
    }).done((response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      _this.setState({
        bookmarkId: null,
        url: _this.props.url
      })
    }).fail((data, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
    });
  }

  render() {
    let bookmarkElement;
    if (this.state.bookmarkId) {
      bookmarkElement = <div className="icon-text">
        <svg className="icon icon-sm icon-positive">
          <use xlinkHref={ window.SpritePath + '#check' }></use>
        </svg>
        <span><a href="#" onClick={ this.destroyBookmark }>Bookmarked</a></span>
      </div>
    } else {
      bookmarkElement = <div className="icon-text">
        <svg className="icon icon-sm">
          <use xlinkHref={ window.SpritePath + '#bookmark-active' }></use>
        </svg>
        <span><a href="#" onClick={ this.createBookmark }>Bookmark</a></span>
      </div>
    }
    return(bookmarkElement)
  }
}

export default BookmarkComponent;
