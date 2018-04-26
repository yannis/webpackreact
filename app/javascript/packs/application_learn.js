/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// import Rails from 'rails-ujs';
// import Rails from 'rails-ujs';
import jQuery from 'jquery'

window.jQuery = jQuery;
window.$ = jQuery;
// window.Rails = Rails;

import './../components/learn/notifications/notifications-component.jsx';
import './../components/flash.jsx';

import './../components/selfies/selfie-component.jsx';
import './../components/learn/units/learn-unit-component.jsx';

import './../learn.jsx';
