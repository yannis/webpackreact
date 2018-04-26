import React from 'react';
import QuizzHintsComponent from '../../quizz-hints-component';
import QuizzCheckboxComponent from '../../quizz-checkbox-component';
import _ from 'lodash';

class LearnQuizzMultipleChoiceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answerIds: props.element.attributes.learnerLastAnswerIds ? props.element.attributes.learnerLastAnswerIds : [],
      message: props.element.attributes.grading ? props.element.attributes.grading.message : null,
      hints: props.element.attributes.grading ? props.element.attributes.grading.hints : [],
      success: props.element.attributes.grading ? props.element.attributes.grading.success : false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleChange(event) {
    let input = event.target;
    let newValue = this.state.answerIds;
    let inputValue = parseInt(input.value);
    if (input.checked) {
      newValue.push(inputValue)
    } else {
      let pos = newValue.indexOf(inputValue);
      newValue.splice(pos, 1)
    }
    this.setState({ answerIds: newValue });
  }

  handleSuccess(truthy) {
    this.props.handleSuccess(this.props.element.id, truthy)
  }

  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    let element = this.props.element;
    let url = element.links.grader;
    let answerIds = this.state.answerIds;
    $.ajax({
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: url,
      type: 'post',
      data: {
        quizz_multiple_choice_grader: {
          answer_ids: answerIds
        }
      }
    }).done( (response) => {
      _this.handleSuccess(true);
      _this.setState(() => {
        return {
          message: response.message,
          hints: response.hints,
          success: true
        }
      })
    }).fail((data) => {
      _this.handleSuccess(false);
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
    let element = this.props.element;
    let answersData = element.relationships.answers.data;
    let answersCheckBoxes = [];
    let hints = this.state.hints;
    let answerIds = this.state.answerIds;
    let answers = answersData.sort((a, b) => {
      if (a.position != b.position){
        return a.position - b.position;
      } else {
        return a.id - b.id;
      }
    }).forEach(function(answer, index) {
      let checked = _.includes(answerIds, answer.id);
      answersCheckBoxes.push(<QuizzCheckboxComponent
                    answer={ answer }
                    key={ index }
                    hint={ hints[answer.id] }
                    checked={ checked } />);
    });

    let hintComponent;
    if (this.state.message || hints.general){
      hintComponent = <QuizzHintsComponent message={ this.state.message } hints={ hints.general ? [hints.general] : [] } success={ this.state.success } />;
    }

    return (<div>
              <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
              { hintComponent }
              <form className='quizz form' onSubmit={ this.handleSubmit } onChange={this.handleChange} >
                { answersCheckBoxes }
                <div className='form-group'>
                  <button className='btn btn-primary'>Submit</button>
                </div>
              </form>
            </div>);
  }
}

export default LearnQuizzMultipleChoiceComponent;
