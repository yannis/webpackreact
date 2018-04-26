import hljs from 'highlight.js';
import LatexResistentMarkdownConverter from './latex-resistent-markdown-converter.js';

window.Utility = window.Utility || {};

Utility.PreviewMarkdown = {

  call() {
    $('.markdown-form-field').each((i, element) => {
      this.convertFormField(element);
    })
  },

  convertFormField(element) {
    let textarea;
    let $element = $(element);
    if ($element.is('textarea')) {
      textarea = $element;
    } else {
      textarea = $element.find('textarea');
    }
    let mdName = textarea.attr('name');
    let htmlName = mdName.replace("_md", "_html");
    let markdown = textarea.val();
    let htmlConverted = LatexResistentMarkdownConverter.convert(markdown);

    let preview = $("<div></div>");
    let card = $("<div class='card card-outline-primary'></div>");
    let cardBlock = $("<div class='card-block'></div>");
    preview.append(card);
    card.append(cardBlock);
    textarea.after(preview);
    if (htmlConverted.length > 0) {
      preview.prepend($("<strong class='preview-title'>HTML preview</strong>"));
      cardBlock.html(htmlConverted);
    }

    let hiddenInput = $("<input type='hidden' />");
    hiddenInput.attr('name', htmlName);
    hiddenInput.val(htmlConverted);
    textarea.after(hiddenInput);

    textarea.on('input', (e) => {
      htmlConverted = LatexResistentMarkdownConverter.convert(textarea.val());
      if (htmlConverted.length) {
        if (preview.find('.preview-title').length == 0) {
          preview.prepend($("<strong class='preview-title'>HTML preview</strong>"));
        }
        cardBlock.html(htmlConverted);
      } else {
        preview.html('')
      }
      hiddenInput.val(htmlConverted);
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    })
  }
}

$(document).on('turbolinks:load', () => {
  Utility.PreviewMarkdown.call();
})
