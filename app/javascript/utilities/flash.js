import React from 'react';
import {render} from 'react-dom';
import FlashMessages from '../components/flash';

// window.Utilities = window.Utilities || {};
let Flash = {
  remove() {
    $('.alert:not(.alert-devise)')
      .delay(10000).fadeOut().delay(1000).queue(() => {
        $(this).remove();
      })
      .on('click', () => {
        $(this).fadeOut().delay(1000).queue(() => {
          $(this).remove();
        })
      })
  },

  handleFlashMessagesHeader(node, xhr) {
    const _this = this;
    var rawMessages = xhr.getResponseHeader("X-Flash-Messages");
    if (rawMessages) {
      var jsonMessages = JSON.parse(rawMessages);
      $.each( jsonMessages, function( type, text ) {
        _this.setMessage(node, type, text);
      })
    }
  },

  setMessage(node, type, text) {
    var message = { type: type, text: text };
    Utilities.FMessages.push(message);
    setTimeout(function(data) {
      Utilities.FMessages.splice(message, 1);
      node.messages(Utilities.FMessages);
    }, 10000);
    node.messages(Utilities.FMessages);
  }
}

$(document).on('turbolinks:load', () => {
  window.Utilities = window.Utilities || {};
  window.Utilities.FMessages = window.Utilities.FMessages || [];
  window.flashDiv = render(<FlashMessages messages={ Utilities.FMessages } />, $('#flash-messages')[0]);
  Flash.remove();
})

$(document).on('ajaxComplete, ujs:complete', (event, xhr, settings) => {
  Flash.handleFlashMessagesHeader(flashDiv, xhr);
});

export default Flash;
