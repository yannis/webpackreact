import showdown, { Converter } from 'showdown';

showdown.extension('targetlink', function() {
  return [{
    type: 'lang',
    regex: /\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\4[ \t]*)?\)\{\:target=(["'])(\w*)\6}/g,
    replace(wholematch, linkText, url, a, b, title, c, target) {

      let result = '<a href="' + url + '"';

      if (typeof title != 'undefined' && title !== '' && title !== null) {
        title = title.replace(/"/g, '&quot;');
        title = showdown.helper.escapeCharacters(title, '*_', false);
        result += ' title="' + title + '"';
      }

      if (typeof target != 'undefined' && target !== '' && target !== null) {
        result += ' target="' + target + '"';
      }

      result += '>' + linkText + '</a>';
      return result;
    }
  }];
});

showdown.extension("ignoreLatex", function() {
  return [
    {
      type: 'lang',
      filter(text) {
        let text2 = text.replace(/^¨D¨D(\n(.+\n)+)¨D¨D$/gm, (match, p1, p2, offset, string) => {
          let sanitizedCapture = p1.replace(/_/g, '\_')
          return "<latex data-code=\"¥¥¥¥" + p1 + "¥¥¥¥\">LATEX</latex>";
        })

        // function replaceSpacesChars(match, offset, string) {
        //   console.log('match', match);
        //   console.log('offset', offset);
        //   console.log('string', string);
        //   return "<latex data-code=\"" + offset + "\">LATEX</latex>"
        // }
        // // return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
        // return text.replace(/\\\\/g, "\\\\\\").replace(/¨D([\S]*)¨D/g, replaceSpacesChars)
        return text2.replace(/¨D(\S+)¨D/g, "<latex data-code=\"$1\">LATEX</latex>")
      }
    },
    // {
    //   type: 'output',
    //   regex: /--line-numbers/g,
    //   replace: ' line-numbers'
    // }
  ];
});

showdown.extension('ignoreCodeBlock', function() {
  return [
    {
      type: 'output',
      filter: (text, converter, options) => {
        // use new shodown's regexp engine to conditionally parse codeblocks
        let left  = '<pre><code\\b[^>]*>',
            right = '</code></pre>',
            flags = 'g',
            replacement = function (wholeMatch, match, left, right) {
              return wholeMatch.replace(/'&lt;latex data-code="(\S+)"&gt;LATEX&lt;\/latex&gt;'/g, "'$$$1$$'");
            };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
});

const LatexResistentMarkdownConverter = {

  convert(markdown) {

    const converter = new Converter({
      literalMidWordUnderscores: true,
      tables: true,
      // openLinksInNewWindow: true,
      extensions: ['targetlink', 'ignoreLatex', 'ignoreCodeBlock'],
      emoji: true
    });
    // converter.useExtension("ignoreLatex");
    let html =  converter.makeHtml(markdown)
    // debugger
    return html.replace(/<latex data-code=\"¥¥¥¥([^¥]+)¥¥¥¥\">LATEX<\/latex>/g, '$$$$$1$$$$').replace(/<latex data-code=\"(\S+)\">LATEX<\/latex>/g, '$$$1$$');
  }
}
export default LatexResistentMarkdownConverter;
