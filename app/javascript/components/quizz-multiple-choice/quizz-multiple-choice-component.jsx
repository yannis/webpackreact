import React from 'react';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import FormQuizzMultipleChoiceComponent from './form-quizz-multiple-choice-component';
import QuizzHintsComponent from '../quizz-hints-component';
import QuizzCheckboxComponent from '../quizz-checkbox-component';

class QuizzMultipleChoiceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer_ids: [],
      message: null,
      hints: {},
      success: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cancelForm = this.cancelForm.bind(this)
  }

  cancelForm(e) {
    e.preventDefault();
    this.props.cancelForm();
  }

  handleChange(event) {
    let input = event.target;
    let newValue = this.state.answer_ids;
    let inputValue = input.value;
    if (input.checked) {
      newValue.push(inputValue)
    } else {
      let pos = newValue.indexOf(inputValue);
      newValue.splice(pos, 1)
    }
    this.setState({ answer_ids: newValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);
    let url = element.links.grader;
    let answer_ids = this.state.answer_ids;
    $.ajax({
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: url,
      type: 'post',
      data: {
        quizz_multiple_choice_grader: { answer_ids }
      }
    }).done( (response) => {
      _this.setState(() => {
        return {
          message: response.message,
          hints: response.hints,
          success: true
        }
      })
    }).fail((data) => {
      let hints = data.responseJSON.hints;
      let message = data.responseJSON.message;
      _this.setState(() => {
        return {
          message,
          hints: hints,
          success: false
        }
      })
    });
  }

  render() {
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);
    let answersData = element.relationships.answers.data;
    let answersCheckBoxes = [];
    let hints = this.state.hints;
    let answers = answersData.sort((a, b) => {
      if (a.position != b.position){
        return a.position - b.position;
      } else {
        return a.id - b.id;
      }
    }).forEach(function(answer, index) {
      answersCheckBoxes.push(<QuizzCheckboxComponent
                    answer={ answer }
                    key={ index }
                    hint={ hints[answer.id] } />);
    });

    let hintComponent;
    if (this.state.message || hints.general){
      hintComponent = <QuizzHintsComponent message={ this.state.message } hints={ hints.general ? [hints.general] : [] } success={ this.state.success } />;
    }

    let content = <div>
                    <BlockAdminButtonComponent block={this.props.block} element={element} />
                    <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
                    { hintComponent }
                    <form className='quizz form' onSubmit={ this.handleSubmit } onChange={this.handleChange} >
                      { answersCheckBoxes }
                      <div className='form-group'>
                        <button className='btn btn-primary'>Submit</button>
                      </div>
                    </form>
                  </div>

    if (this.props.editingElement === element) {
      content = <FormQuizzMultipleChoiceComponent
        element={ this.props.editingElement }
        unit={ this.props.unit }
        cancelForm={ this.cancelForm }
        url={ this.props.editingElement.links.self }
        method='patch'
        submitForm={ this.props.submitForm }
        success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
        errors={ this.props.errors }
      />;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

$(document).on('turbolinks:load', function(){
  let elements = document.getElementsByClassName('quizz-multiple-choice-component');
  [].forEach.call(elements, (element) => {
    let multipleChoiceQuizz = element.dataset.element;
    render(<QuizzMultipleChoiceComponent
      element={ multipleChoiceQuizz }
    />, element);
  })
})

function  mapStateToProps(state) {
  return {
    unit: state.units.unit,
    editingElement: state.elements.editingElement,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizzMultipleChoiceComponent);
