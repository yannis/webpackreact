import React from 'react';
import ReactDom, { render } from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import FormQuizzSingleChoiceComponent from './form-quizz-single-choice-component';
import QuizzHintsComponent from '../quizz-hints-component.jsx';
import QuizzRadioComponent from '../quizz-radio-component.jsx';

class QuizzSingleChoiceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answer_id: null,
      message: null,
      hints: [],
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
    this.setState({
      answer_id: event.target.value
    });
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
    let element = (typeof(this.props.element) === 'object' ? this.props.element : JSON.parse(this.props.element).data);
    let answersData = element.relationships.answers.data;
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
                    onClick={ _this.handleChange} />);
    });

    let hintComponent;
    if (this.state.message || hints.general){
      hintComponent = <QuizzHintsComponent message={ this.state.message } hints={ hints.general ? [hints.general] : [] } success={ this.state.success } />;
    }

    let content = <div>
                    <BlockAdminButtonComponent block={this.props.block} element={element} />
                    <div dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }} />
                    { hintComponent }
                    <form className='quizz form' onSubmit={ this.handleSubmit } >
                      { answersRadioButtons }
                      <div className='form-group'>
                        <button className='btn btn-primary'>Submit</button>
                      </div>
                    </form>
                  </div>

    if (this.props.editingElement === element) {
      content = <FormQuizzSingleChoiceComponent
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
  let elements = document.getElementsByClassName('quizz-single-choice-component');
  [].forEach.call(elements, (element) => {
    let singleChoiceQuizz = element.dataset.element;
    render(<QuizzSingleChoiceComponent
      element={ singleChoiceQuizz }
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

export default connect(mapStateToProps, mapDispatchToProps)(QuizzSingleChoiceComponent);
