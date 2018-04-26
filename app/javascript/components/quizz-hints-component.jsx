import React from 'react';
import LatexResistentMarkdownConverter from '../utilities/latex-resistent-markdown-converter.js';

export default class QuizzHintsComponent extends React.Component {

  componentDidMount() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  render() {
    let hints = this.props.hints;
    let className = "card mb-3";
    let message;
    let hintElement;
    let hintElements = [];
    if (this.props.success) {
      className += ' text-white bg-success';
    } else {
      className += ' text-white bg-danger';
    }
    hints.forEach(function(hint, index) {
      let htmlHint = LatexResistentMarkdownConverter.convert(hint);
      hintElements.push(<p key={ index } className='card-text' dangerouslySetInnerHTML={{__html: htmlHint }} />);
    });
    if (hints.length) {
      hintElement = <div className='card-body'>{hintElements}</div>
    }
    return(
      <div className={ className }>
        <div className='card-header'>{ this.props.message }</div>
        { hintElement }
      </div>
    )
  }
}
