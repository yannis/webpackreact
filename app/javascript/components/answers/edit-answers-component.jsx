import React from 'react';
import { findDOMNode, render } from 'react-dom';
import autosize from 'autosize/dist/autosize.js';
import LatexResistentMarkdownConverter from '../../utilities/latex-resistent-markdown-converter.js';
import EditAnswerComponent from './edit-answer-component';
import Sortable from 'sortablejs';

class EditFormAnswersComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.answers
    };
  }

  componentDidMount() {
    let _this = this;
    var actions = this.props.actions;
    const node = findDOMNode(this);
    Sortable.create(node, {
      draggable: ".answer-sortable",
      handle: '.sortable-handle',
      ghostClass: 'sortable-ghost',
      onUpdate(event)  {
        let itemEl = event.item;  // dragged HTMLElement
        let ids = $(this.el.children).map((index, li) => {
          return li.dataset.id;
        }).toArray();
        let answers = []
        ids.forEach(function(id, index) {
          let answer = _this.state.answers.filter((answer) => {
            return answer.id.toString() === id.toString()
          })[0]
          answer.position = index+1
          answers.push(answer)
        })
        _this.setState({
          answers
        })
      },
    });
  }

  render() {
    let answers = [];
    let _this = this;
    let objectId = this.props.objectId;
    let objectType = this.props.objectType;
    let answer_errors;
    if (this.props.errors) {
      answer_errors = this.props.errors.map((error, i) => { return <div key={ i } className="alert alert-danger">{error}</div>} )
    }

    this.state.answers.forEach(function(answer, index) {
      if (answer.id) {
        let newId = (new Date().getTime())+index;
        answers.push(<EditAnswerComponent
                      answer={ answer }
                      key={ newId }
                      objectType={ objectType }
                      objectId={ objectId }
                    />);
      } else {
        let newId = (new Date().getTime())+index;
        answers.push(<NewAnswerComponent
                      answer={ answer }
                      answerId={ newId }
                      key={ newId }
                      objectType={ objectType }
                      objectId={ objectId }
                      onRemove={ _this.removeAnswer }
                      answersCount={ _this.state.answersCount + 1 }
                    />);
      }
    });
    return (
      <div>
        { answer_errors }
        {answers}
      </div>
    );
  }
}

export default EditFormAnswersComponent;
