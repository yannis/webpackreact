/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// import Rails from 'rails-ujs';
// import jQuery from 'jquery'

// window.jQuery = jQuery;
// window.$ = jQuery;
// window.Rails = Rails;

// import 'select2/dist/js/select2.min.js';

// $(document).on('turbolinks:load', () => {
//   // $('select').not('.tag_list').select2();
//   // $('select.tag_list').select2({
//   //   tags: true,
//   //   tokenSeparators: [',', ' ']
//   // });
// })


window.Sortable = require('sortablejs/Sortable.min.js');

import './../components/video-player-component.jsx';
import './../components/sortable-list-component.jsx';
import './../components/notifications-nav-component.jsx';
import './../components/form-images-component.jsx';
// import './../components/aform-answers-component.jsx';
import './../components/quizz-single-choice/quizz-single-choice-component.jsx';
import './../components/quizz-multiple-choice/quizz-multiple-choice-component.jsx';

import './../components/selfies/selfie-component.jsx';
import './../components/approval-component.jsx';
// import './../components/units/unit-container-component.jsx';
import './../index.jsx';
// import './../components/block-list-component.jsx';


import './../components/flash.jsx';

import ReactDom from 'react-dom';


document.addEventListener('turbolinks:before-render', () => {
  let element = document.getElementById('unit-component');
  if (element) {
    ReactDom.unmountComponentAtNode(element)
  }
});

document.addEventListener('turbolinks:before-cache', () => {
  let element = document.getElementById('unit-component');
  if (element) {
    ReactDom.unmountComponentAtNode(element)
  }
});
