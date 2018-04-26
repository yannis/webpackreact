import React from 'react';
import { findDOMNode, render } from 'react-dom';
import autosize from 'autosize/dist/autosize.js';
import MarkdownPreviewTextarea from '../markdown-preview-textarea-component';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';

class EditAnswerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textHtml: '',
      hintHtml: ''
    }
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    autosize(document.querySelectorAll('textarea'));
    let textHtml = this.props.answer.textMd ? LatexResistentMarkdownConverter.convert(this.props.answer.textMd) : '';
    let hintHtml = this.props.answer.hintMd ? LatexResistentMarkdownConverter.convert(this.props.answer.hintMd) : '';
    this.setState({
      textHtml,
      hintHtml
    })
  }

  setValue(e) {
    let answer = this.props.answer;
    let id = answer.id;
    let objectType = this.props.objectType;

    let text_md_input_id = objectType+"_answers_attributes_"+id+"_text_md";
    let hint_md_input_id = objectType+"_answers_attributes_"+id+"_hint_md";

    if (e.target.id === text_md_input_id) {
      let textHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState({
        textHtml
      })
    } else if (e.target.id === hint_md_input_id) {
      let hintHtml = LatexResistentMarkdownConverter.convert(e.target.value);
      this.setState({
        hintHtml
      })
    }
  }

  render() {
    let answer = this.props.answer;
    let id = answer.id;
    let objectType = this.props.objectType;
    let objectId = this.props.objectId;

    let id_input_name = objectType+"[answers_attributes]["+id+"][id]";

    let text_md_input_name = objectType+"[answers_attributes]["+id+"][text_md]";
    let text_md_input_id = objectType+"_answers_attributes_"+id+"_text_md";
    let text_md_input_class = objectType+"_answers_attributes_text_md form-control";
    let text_html_input_name = objectType+"[answers_attributes]["+id+"][text_html]";

    let textField = <MarkdownPreviewTextarea
      label='Text'
      labelClassName='col-form-label'
      id={text_md_input_id}
      className={text_md_input_class}
      mdName={text_md_input_name}
      htmlName={text_html_input_name}
      value={ answer.textMd }
      required
    />

    let correct_input_name = objectType+"[answers_attributes]["+id+"][correct]";
    let correct_input_id = objectType+"_answers_attributes_"+id+"_correct";
    let correct_input_class = objectType+"_answers_attributes_correct form-check-input";
    let correct_input_checked = answer.correct;

    let hint_md_input_name = objectType+"[answers_attributes]["+id+"][hint_md]";
    let hint_md_input_id = objectType+"_answers_attributes_"+id+"_hint_md";
    let hint_md_input_class = objectType+"_answers_attributes_hint_md form-control";
    let hint_html_input_name = objectType+"[answers_attributes]["+id+"][hint_html]";

    let hintField = <MarkdownPreviewTextarea
      label='Hint'
      labelClassName='col-form-label'
      id={hint_md_input_id}
      className={hint_md_input_class}
      mdName={hint_md_input_name}
      htmlName={hint_html_input_name}
      value={ answer.hintMd }
    />

    let position_input_name = objectType+"[answers_attributes]["+id+"][position]";

    let destroy_input_name = objectType+"[answers_attributes]["+id+"][_destroy]";
    let destroy_input_id = objectType+"_answers_attributes_"+id+"_destroy";
    let destroy_input_class = objectType+"_answers_attributes_destroy form-control";

    let sortHandle = <span className='sortable-handle pull-right' title='Drag to sort'><i className="fa fa-sort" aria-hidden="true"></i></span>;

    return (
      <fieldset className='answer answer-sortable' data-id={ id }>
        { sortHandle }
        <input type="hidden" name={ id_input_name } value={ id } />
        <input type="hidden" name={ position_input_name } defaultValue={ answer.position } />
        { textField }
        { hintField }
        <div className="form-check">
          <label htmlFor={ correct_input_id } className='form-check-label' >
            <input type="hidden" name={ correct_input_name } className={ correct_input_class } value='0'/>
            <input type="checkbox" id={ correct_input_id } name={ correct_input_name } className={ correct_input_class } defaultChecked={ correct_input_checked } value='1' />
            Correct
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="hidden" name={ destroy_input_name } value="0" />
            <input className="form-check-input" type="checkbox" name={ destroy_input_name } value="1" id={ destroy_input_id } />
            Remove
          </label>
        </div>
      </fieldset>
    );
  }
}

export default EditAnswerComponent;
