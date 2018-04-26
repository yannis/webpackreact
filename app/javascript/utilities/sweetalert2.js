import swal from 'sweetalert2';
import Rails from 'rails-ujs';
import Flash from './flash';

$(document).on('turbolinks:load', () => {
  $("[data-swal='true']").on("click", (event) => {
    Rails.stopEverything(event)
    let element = $(event.target);
    if (!element.is('a')) { element = element.parents('a') }
    let title = element.data('title');
    let text = element.data('text') || '';
    let method = element.data('method') || 'GET';
    let url = element.attr('href');
    swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d30a09',
      cancelButtonColor: '#28c664',
      confirmButtonText: 'Yes, please',
      cancelButtonText: 'No, thank you',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        $.ajax({
          beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
          url: url,
          type: method
        }).done( (response, message, xhr) => {
          Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
          // use Turbolinks redirect response
          if (typeof(response) === 'string') {
            eval(response)
          } else {
            window.location.reload(true);
          }
        }).fail( (response, message, xhr) => {
          Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
          window.location.reload(true);
        });
      }
    })
  })
})
