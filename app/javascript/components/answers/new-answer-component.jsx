import React from 'react';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';
import autosize from 'autosize/dist/autosize.js';

class NewAnswerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textHtml: '',
      hintHtml: ''
    }
    this.setValue = this.setValue.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
  }

  setValue(e) {
    if (e.target.name.match(/text_md/g)) {
      let textHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState({
        textHtml
      })
    } else if (e.target.name.match(/hint_md/g)) {
      let hintHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState({
        hintHtml
      })
    }
  }

  removeAnswer() {
    this.props.onRemove(this.props.answerId);
  }

  render() {

    let id = (new Date().getTime()) + _.random(10000);
    let objectType = this.props.objectType;
    let objectId = this.props.objectId;

    let text_md_input_name = objectType+"[answers_attributes]["+id+"][text_md]";
    let text_md_input_id = objectType+"_answers_attributes_"+id+"_text_md";
    let text_md_input_class = objectType+"_answers_attributes_text_md form-control";
    let text_html_input_name = objectType+"[answers_attributes]["+id+"][text_html]";

    let textField = <MarkdownPreviewTextarea
      label='Text'
      id={text_md_input_id}
      className={text_md_input_class}
      mdName={text_md_input_name}
      htmlName={text_html_input_name}
      required='true'
    />

    let hint_md_input_name = objectType+"[answers_attributes]["+id+"][hint_md]";
    let hint_md_input_id = objectType+"_answers_attributes_"+id+"_hint_md";
    let hint_md_input_class = objectType+"_answers_attributes_hint_md form-control";
    let hint_html_input_name = objectType+"[answers_attributes]["+id+"][hint_html]";

    let hintField = <MarkdownPreviewTextarea
      label='Hint'
      id={hint_md_input_id}
      className={hint_md_input_class}
      mdName={hint_md_input_name}
      htmlName={hint_html_input_name}
    />

    let correct_input_name = objectType+"[answers_attributes]["+id+"][correct]";
    let correct_input_id = objectType+"_answers_attributes_"+id+"_correct";
    let correct_input_class = objectType+"_answers_attributes_correct form-check-input";

    let position_input_name = objectType+"[answers_attributes]["+id+"][position]";

    let textMdInput;
    let hintMdInput;
    let correctInput;

    textMdInput = <textarea id={ text_md_input_id } name={ text_md_input_name } className={ text_md_input_class } defaultValue={ this.props.answer ? this.props.answer.textMd : null } required />;
    hintMdInput = <textarea id={ hint_md_input_id } name={ hint_md_input_name } className={ hint_md_input_class } defaultValue={ this.props.answer ? this.props.answer.hintMd : null } />;
    correctInput = <input type="checkbox" id={ correct_input_id } name={ correct_input_name } className={ correct_input_class } value='1' defaultChecked={ this.props.answer ? this.props.answer.correct : null } />

    let textHtmlInput = <input type="hidden" name={ text_html_input_name } defaultValue={ this.state.textHtml } />;
    let hintHtmlInput = <input type="hidden" name={ hint_html_input_name } defaultValue={ this.state.hintHtml } />;

    return (
      <fieldset className='answer' onChange={ this.setValue }>
        <input type="hidden" name={ position_input_name } defaultValue='100' />
        { textField }
        { hintField }
        <div className="form-check">
          <label htmlFor={ correct_input_id } className='form-check-label' >
            <input type="hidden" name={ correct_input_name } className={ correct_input_class } value='0'/>
            { correctInput }
            Correct
          </label>
        </div>
        <a onClick={ this.removeAnswer } className="btn btn-danger btn-sm answer-remove-link">
          <i className="fa fa-minus" aria-hidden="true"></i> Remove
        </a>
      </fieldset>
    );
  }
}

export default NewAnswerComponent;
