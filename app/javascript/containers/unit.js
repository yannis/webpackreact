import React from 'react';
import ReactDom, { render } from 'react-dom';
import { connect } from 'react-redux';
import UnitComponent from '../components/units/unit-component';
import Rails from 'rails-ujs';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

class UnitContainer extends React.Component {

  constructor(props) {
    super(props);
    this.setBlocks = this.setBlocks.bind(this);
    this.setElements = this.setElements.bind(this);
    this.setBlockForm = this.setBlockForm.bind(this);
    this.editElement = this.editElement.bind(this);
    this.showMarkdownPreview = this.showMarkdownPreview.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchUnit(this.props.unitUrl);
    this.props.actions.fetchTeachers(this.props.teachersUrl);
  }

  setBlocks(blocks) {
    this.props.actions.setBlocks(blocks)
  }

  setElements(elements) {
    this.props.actions.setElements(elements)
  }

  setBlockForm(value) {
    this.props.actions.editElement(null);
    this.props.actions.setBlockForm(value);
    this.showMarkdownPreview(null);
  }

  editElement(value) {
    this.props.actions.setBlockForm(null);
    this.props.actions.editElement(value);
    this.showMarkdownPreview(null);
  }

  showMarkdownPreview(html) {
    this.props.actions.showMarkdownPreview(html)
  }

  render() {
    let unitComponent;
    if (this.props.unit) {
      unitComponent = <UnitComponent
        unit={ this.props.unit }
        blocks={ this.props.blocks }
        pagePreview={ this.props.pagePreview }
        elements={ this.props.elements }
        blockForm={ this.props.blockForm }
        editingElement={ this.props.editingElement }
        teachers={ this.props.teachers }
        setElements={ this.setElements }
        editElement={ this.editElement }
        setBlocks={ this.setBlocks }
        setBlockForm={ this.setBlockForm }
        showMarkdownPreview={ this.showMarkdownPreview }
        resourcesBucket={ this.props.resourcesBucket }
      />
    }
    return (
      <div>
        { unitComponent }
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
    // unitUrl: state.units.url,
    unit: state.units.unit,
    blocks: state.blocks.blocks,
    blockForm: state.blocks.blockForm,
    editingElement: state.elements.editingElement,
    elements: state.elements.elements,
    resources: state.resources.resources,
    reviews: state.reviews.reviews,
    teachers: state.teachers.teachers,
    pagePreview: state.units.pagePreview
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitContainer);
