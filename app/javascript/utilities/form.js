import autosize from 'autosize/dist/autosize.js';

window.Utility = window.Utility || {};

Utility.Form = {

  disableOnSubmit() {
    $('form').on('submit', () => {
      let $form = $(this);
      $form.find('.form-submit, .form-cancel').prop('disabled', true).addClass('disabled');
    });
  },

  setQuestionForm() {
    $('#learn-question-form').on("ajax:error", (e) => {
      const questionForm = $(e.target);
      questionForm.html(e.detail[0]);
      autosize(e.target.querySelectorAll('textarea'));
      questionForm.find('.invalid-feedback').show();
    })
  },

  setAnswerForm() {
    $('.learn-answer-form').on("ajax:error", (e) => {
      const answerForm = $(e.target);
      answerForm.html(e.detail[0]);
      autosize(e.target.querySelectorAll('textarea'));
      answerForm.find('.invalid-feedback').show();
    })
  }
}

$(document).on('turbolinks:load', () => {
  // Utility.Form.disableOnSubmit();
  Utility.Form.setQuestionForm();
  Utility.Form.setAnswerForm();
  $('.invalid-feedback').show();
});
