import autosize from 'autosize/dist/autosize.js';

$(document).on('turbolinks:load', () => {
  $('body').addClass('loaded');
  autosize($('textarea'));
})
