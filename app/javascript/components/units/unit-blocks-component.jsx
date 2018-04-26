import React from 'react';
import ReactDom from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SortableBlocksComponent from './sortable-blocks-component';
import FormPageComponent from '../pages/form-page-component';
import FormVideoComponent from '../videos/form-video-component';
import FormQuizzSingleChoiceComponent from '../quizz-single-choice/form-quizz-single-choice-component';
import FormQuizzMultipleChoiceComponent from '../quizz-multiple-choice/form-quizz-multiple-choice-component';
import FormTextQuizzComponent from '../text_quizzs/form-text-quizz-component';
import FormFigureComponent from '../figures/form-figure-component';
import FormResourceComponent from '../resources/resource-form-component';
import FormFeedbackComponent from '../feedbacks/feedback-form-component';

class UnitBlocksComponent extends React.Component {

  constructor(props) {
    super(props);
    this.setBlockForm = this.setBlockForm.bind(this);
    this.editElement = this.editElement.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.autosaveForm = this.autosaveForm.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.editElement(null);
  }

  setBlockForm(e) {
    e.preventDefault();
    let value = e.target.dataset.block_type;
    this.props.actions.editElement(null);
    this.props.actions.setBlockForm(value);
  }

  editElement(value) {
    this.props.actions.setBlockForm(null);
    this.props.actions.editElement(value);
    // this.showMarkdownPreview(null);
  }

  cancelForm(e) {
    this.props.cancelForm(e);
  }

  submitForm(e, url, method, success) {
    e.preventDefault();
    this.props.submitForm(e, url, method, success);
  }

  autosaveForm(form, url, method) {
    this.props.autosaveForm(form, url, method);
  }

  render() {
    let unit = this.props.unit;
    let blocks = this.props.blocks;

    let form = <SortableBlocksComponent
      onSort={ this.setBlocks }
      sorterUrl={ unit.links.blockSorter }
      blocks={ blocks }
      unit={ unit }
    />;
    switch(this.props.blockForm) {
      case 'pages':
        form = <FormPageComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/pages' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          autosaveForm={ this.autosaveForm }
          errors={ this.props.errors }
        />;
        break;
      case 'videos':
        form = <FormVideoComponent
          unit={ unit }
          teachers={ this.props.teachers }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/videos' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          errors={ this.props.errors }
        />;
        break;
      case 'single_choice_quizzs':
        form = <FormQuizzSingleChoiceComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/single_choice_quizzs' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          errors={ this.props.errors }
        />;
        break;
      case 'multiple_choice_quizzs':
        form = <FormQuizzMultipleChoiceComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/multiple_choice_quizzs' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          errors={ this.props.errors }
        />;
        break;
      case 'text_quizzs':
        form = <FormTextQuizzComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/text_quizzs' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          errors={ this.props.errors }
        />;
        break;
      case 'figures':
        form = <FormFigureComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/figures' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          errors={ this.props.errors }
        />;
        break;
      case 'feedbacks':
        form = <FormFeedbackComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/feedbacks' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_BLOCK_AND_ELEMENT }
          errors={ this.props.errors }
        />;
        break;
      case 'review':
        form = <ReviewFormComponent
          unit={ unit }
          cancelForm={ this.cancelForm }
          url={ unit.links.self + '/reviews' }
          method='post'
          submitForm={ this.submitForm }
          success= { Actions.ADD_REVIEW }
          errors={ this.props.errors }
        />;
        break;
      default:
        form = <SortableBlocksComponent
          onSort={ this.setBlocks }
          sorterUrl={ unit.links.blockSorter }
          blocks={ blocks }
          unit={ unit }
        />
    }
    if (this.props.editingElement) {
      let elementType = this.props.editingElement.type;
      switch(elementType) {
        case 'pages':
          form = <FormPageComponent
            element={ this.props.editingElement }
            unit={ unit }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            autosaveForm={ this.autosaveForm }
            errors={ this.props.errors }
          />;
          break;
        case 'videos':
          form = <FormVideoComponent
            element={ this.props.editingElement }
            unit={ unit }
            teachers={ this.props.teachers }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            errors={ this.props.errors }
          />;
          break;
        case 'singleChoiceQuizzs':
          form = <FormQuizzSingleChoiceComponent
            element={ this.props.editingElement }
            unit={ unit }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            errors={ this.props.errors }
          />;
          break;
        case 'multipleChoiceQuizzs':
          form = <FormQuizzMultipleChoiceComponent
            element={ this.props.editingElement }
            unit={ unit }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            errors={ this.props.errors }
          />;
          break;
        case 'textQuizzs':
          form = <FormTextQuizzComponent
            element={ this.props.editingElement }
            unit={ unit }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            errors={ this.props.errors }
          />;
          break;
        case 'figures':
          form = <FormFigureComponent
            element={ this.props.editingElement }
            unit={ unit }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            errors={ this.props.errors }
          />;
          break;
        case 'feedbacks':
          form = <FormFeedbackComponent
            element={ this.props.editingElement }
            unit={ unit }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
            errors={ this.props.errors }
          />;
          break;
        case 'reviews':
          form = <ReviewFormComponent
            element={ this.props.editingElement }
            cancelForm={ this.cancelForm }
            url={ this.props.editingElement.links.self }
            method='patch'
            submitForm={ this.submitForm }
            success= { Actions.UPDATE_REVIEW }
            errors={ this.props.errors }
          />;
          break;
        default:
          form = <SortableBlocksComponent onSort={ this.setBlocks }
            sorterUrl={ unit.links.blockSorter }
            blocks={ blocks }
          />
      }
    }

    return (<div>{ form }</div>);
  }
}

function mapStateToProps(state) {
  return {
    errors: state.forms.errors,
    blockForm: state.blocks.blockForm,
    editingElement: state.elements.editingElement,
    teachers: state.teachers.teachers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitBlocksComponent);
