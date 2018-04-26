import React from 'react';
import ReactDom from 'react-dom';
// import _ from 'lodash';

import PageComponent from '../pages/page-component';
import VideoComponent from '../videos/video-component';
import QuizzSingleChoiceComponent from '../quizz-single-choice/quizz-single-choice-component';
import QuizzMultipleChoiceComponent from '../quizz-multiple-choice/quizz-multiple-choice-component';
import TextQuizzComponent from '../text_quizzs/text-quizz-component';
import FigureComponent from '../figures/figure-component';
import FeedbackComponent from '../feedbacks/feedback-component';

class UnitPreviewComponent extends React.Component {

  constructor(props) {
    super(props);
    // this.highlightCode = this.highlightCode.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.autosaveForm = this.autosaveForm.bind(this);
  }

  componentDidMount() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    Prism.highlightAll();
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    Prism.highlightAll();
  }

  componentWillUnmount() {
    this.props.cancelForm();
  }

  cancelForm() {
    this.props.cancelForm();
  }

  submitForm(e, url, method, success) {
    e.preventDefault();
    this.props.submitForm(e, url, method, success);
  }

  autosaveForm(form, url, method) {
    this.props.autosaveForm(form, url, method);
  }

  render() {
    const _this = this;
    let blocks = this.props.blocks.sort((a, b) => {
      return a.attributes.position - b.attributes.position
    });
    let elements = [];
    if (blocks) {
      blocks.forEach((block, index) => {
        let element = _this.props.elements.filter((element) => {
          return element.type === block.relationships.element.data.type && element.id === block.relationships.element.data.id;
        })[0]
        if (element !== undefined) {
          switch (element.type) {
            case 'videos':
            let video
              elements.push(<VideoComponent
                element={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
              />)
              break;
            case 'pages':
              elements.push(<PageComponent
                page={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
                autosaveForm={ this.autosaveForm }
              />)
              break;
            case 'singleChoiceQuizzs':
              elements.push(<QuizzSingleChoiceComponent
                element={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
              />)
              break;
            case 'multipleChoiceQuizzs':
              elements.push(<QuizzMultipleChoiceComponent
                element={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
              />)
              break;
            case 'textQuizzs':
              elements.push(<TextQuizzComponent
                element={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
              />)
              break;
            case 'figures':
              elements.push(<FigureComponent
                figure={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
              />);
              break;
            case 'feedbacks':
              elements.push(<FeedbackComponent
                element={ element }
                block={ block }
                key={ block.id }
                cancelForm={ this.cancelForm }
                submitForm={ this.submitForm }
              />);
              break;
            default:
              elements.push(<p key={ block.id }>{block.attributes.type} { block.attributes.fullTitle }</p>);
          }
        }
      });
    }
    return (
      <div className="unit-preview panel panel--text">
        <header>
          <h5>Preview</h5>
        </header>
        { elements }
      </div>
    );
  }
}

export default UnitPreviewComponent;
