window.Utility = window.Utility || {};

Utility.Globals = () => {
  window.SpritePath = document.querySelector("meta[name='sprite-path']").getAttribute('content');
}

$(document).on('turbolinks:load', () => {
  Utility.Globals();
});
