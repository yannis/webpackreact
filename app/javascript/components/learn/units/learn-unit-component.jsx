import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../../actions_learn';
import { bindActionCreators } from 'redux';

import _ from 'lodash';
import Flash from '../../../utilities/flash';

import PageComponent from '../../pages/page-component';
import YoutubePlayer from '../../video-player-component';
import LearnQuizzMultipleChoiceComponent from '../quizz-multiple-choices/learn-quizz-multiple-choice-component';
import LearnQuizzSingleChoiceComponent from '../quizz-single-choices/learn-quizz-single-choice-component';
import LearnTextQuizzComponent from '../quizz-texts/learn-text-quizz-component';
import LearnFeedbackComponent from '../feedbacks/learn-feedback-component';

class LearnUnitComponent extends React.Component {

  constructor(props) {
    super(props);
    const data = JSON.parse(this.props.data);
    const unit = data.data;
    let blocks = [];
    let elements = [];
    if (data.included) {
      blocks = data.included.filter((item) => {
        return item.type === 'blocks';
      }).sort((a, b) => {
        return a.attributes.position - b.attributes.position
      })
      elements = data.included.filter((item) => {
        return _.includes(['pages', 'videos', 'figures', 'singleChoiceQuizzs', 'multipleChoiceQuizzs', 'textQuizzs', 'feedbacks'], item.type);
      })
    }
    this.state = {
      unit,
      blocks,
      elements,
      elementComponents: []
    }
    this.setElementComponents = this.setElementComponents.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    // window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    // Prism.highlightAll();
    this.setElementComponents();
  }

  componentDidUpdate() {
    Prism.highlightAll();
    window.MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
  }

  handleSuccess(elementId, truthy) {
    let completions = {
      ...this.props.completions,
      [elementId]: truthy
    }

    this.props.actions.setCompletionState({ completions });

    let buttonDisabled = _.includes(Object.values(this.props.completions), false);
    if (!buttonDisabled) {
      Flash.setMessage(window.flashDiv, 'success', 'Next unit enabled');
    }
  }

  setElementComponents() {
    const unit = this.state.unit;
    const elements = this.state.elements;
    const blocks = this.state.blocks;
    let completions = {};
    let elementComponents = [];

    if (blocks) {
      blocks.forEach((block, index) => {
        let element = elements.filter((element) => {
          return element.type === block.relationships.element.data.type && element.id === block.relationships.element.data.id;
        })[0]
        if (element !== undefined) {
          switch (element.type) {
            case 'videos':
              completions[element.id] = true;
              elementComponents.push(<YoutubePlayer
                videoId={ element.attributes.videoId }
                key={ block.id }
              />)
              break;
            case 'pages':
              completions[element.id] = true;
              elementComponents.push(<div
                dangerouslySetInnerHTML={{__html: element.attributes.descriptionHtml }}
                key={ block.id }
                className='article'
              />)
              break;
            case 'singleChoiceQuizzs':
              completions[element.id] = (element.attributes.grading ? element.attributes.grading.success : false);
              elementComponents.push(<LearnQuizzSingleChoiceComponent
                element={ element }
                block={ block }
                key={ block.id }
                handleSuccess={ this.handleSuccess }
              />)
              break;
            case 'multipleChoiceQuizzs':
              completions[element.id] = (element.attributes.grading ? element.attributes.grading.success : false);
              elementComponents.push(<LearnQuizzMultipleChoiceComponent
                element={ element }
                block={ block }
                key={ block.id }
                handleSuccess={ this.handleSuccess }
              />)
              break;
            case 'textQuizzs':
              completions[element.id] = true;
              elementComponents.push(<LearnTextQuizzComponent
                element={ element }
                block={ block }
                key={ block.id }
                handleSuccess={ this.handleSuccess }
              />)
              break;
            case 'figures':
              completions[element.id] = true;
              let style = {
                maxWidth: '100%',
                width: (element.attributes.maxWidth ? element.attributes.maxWidth : element.attributes.imageWidth) + 'px'
              }
              // if (element.attributes.maxWidth) {
              //   style['maxWidth'] = element.attributes.maxWidth + 'px';
              // }
              elementComponents.push(
                <figure key={ block.id }>
                  <img src={ element.
                    attributes.imageUrl } alt={ element.
                      attributes.captionSanitized } style={ style } />
                  <figcaption dangerouslySetInnerHTML={{__html: element.
                    attributes.captionHtml }} />
                </figure>
              );
              break;
            case 'feedbacks':
              completions[element.id] = true;
              elementComponents.push(<LearnFeedbackComponent
                element={ element }
                block={ block }
                key={ block.id }
              />);
              break;
            default:
              completions[element.id] = true;
              elementComponents.push(<p key={ block.id }>{block.attributes.type} { block.attributes.fullTitle }</p>);
          }
        }
      });
    }
    this.props.actions.setCompletionState({ completions });
    this.setState({
      elementComponents
    })
  }

  render() {
    return (
      <div>
        { this.state.elementComponents.length === 0 ? <p>No content yet</p> : this.state.elementComponents }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    completions: state.unit.completions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnUnitComponent);
