import React from 'react';
import QuizzHintsComponent from '../../quizz-hints-component.jsx';
import QuizzRadioComponent from '../../quizz-radio-component.jsx'

class LearnQuizzSingleChoiceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer_id: null,
      message: props.element.attributes.grading ? props.element.attributes.grading.message : null,
      hints: props.element.attributes.grading ? props.element.attributes.grading.hints : [],
      success: props.element.attributes.grading ? props.element.attributes.grading.success : false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleChange(event) {
    this.setState({
      answer_id: event.target.value
    });
  }

  handleSuccess(truthy) {
    this.props.handleSuccess(this.props.element.id, truthy)
  }

  handleSubmit(event) {
    event.preventDefault();
    let _this = this;
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);
    let url = element.links.grader;
    let answer_id = this.state.answer_id;
    $.ajax({
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: url,
      type: 'post',
      data: {
        quizz_single_choice_grader: { answer_id }
      }
    }).done( (response) => {
      _this.handleSuccess(true);
      _this.setState(() => {
        return {
          answer_id: answer_id,
          message: response.message,
          hints: response.hints,
          success: true
        }
      })
    }).fail((data) => {
      let hints = data.responseJSON.hints;
      _this.setState(() => {
        return {
          answer_id: answer_id,
          message: data.responseJSON.message,
          hints: hints,
          success: false
        }
      })
    });
  }

  render() {
    let _this = this;
    let element = this.props.element;
    let answersData = element.relationships.answers.data;
    let learnerLastAnswerId = element.attributes.learnerLastAnswerId;
    let answersRadioButtons = [];
    let hints = this.state.hints;
    let answers = answersData.sort((a, b) => {
      if (a.position != b.position){
        return a.position - b.position;
      } else {
        return a.id - b.id;
      }
      return a.position - b.position
    }).forEach(function(answer, index) {
      answersRadioButtons.push(<QuizzRadioComponent
                    answer={ answer }
                    key={ index }
                    hint={ hints[answer.id] }
                    onClick={ _this.handleChange}
                    checked={ answer.id === learnerLastAnswerId } />);
    });

    let hintComponent;
    if (this.state.message || hints.general){
      hintComponent = <QuizzHintsComponent message={ this.state.message } hints={ hints.general ? [hints.general] : [] } success={ this.state.success } />;
    }

    return (<div>
              <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
              { hintComponent }
              <form className='quizz' onSubmit={ this.handleSubmit } >
                { answersRadioButtons }
                <div className='form-group'>
                  <button className='btn btn-primary'>Submit</button>
                </div>
              </form>
            </div>
    );
  }
}

export default LearnQuizzSingleChoiceComponent;
