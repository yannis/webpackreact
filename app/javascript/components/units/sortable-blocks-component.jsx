import React from 'react';
import ReactDom from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sortable from 'sortablejs';
import SortableBlockComponent from './sortable-block-component';
import UnitAddBlocksComponent from './unit-add-blocks-component';

class SortableBlocksComponent extends React.Component {

  constructor(props) {
    super(props);
    this.editElement = this.editElement.bind(this);
    this.destroyBlock = this.destroyBlock.bind(this);
    this.setBlockForm = this.setBlockForm.bind(this);
  }

  componentDidMount() {
    let _this = this;
    // this.loadItems();
    const node = ReactDom.findDOMNode(this).querySelector('ul[data-sorter-url]');
    Sortable.create(node, {
      // handle: ".fa-sort",
      onUpdate(event)  {
        let itemEl = event.item;  // dragged HTMLElement
        let url = this.el.dataset.sorterUrl;
        let ids = $(this.el.children).map((index, li) => {
          return li.dataset.id;
        }).toArray();
        _this.props.actions.sortBlocks({
          url,
          data: {
            ids
          }
        })
      },
    });
  }

  setBlockForm(value) {
    this.props.actions.editElement(null);
    this.props.actions.setBlockForm(value);
  }

  destroyBlock(params = {}) {
    this.props.actions.destroyBlock({id: params.id, url: params.url})
  }

  editElement(payload) {
    this.props.actions.editElement(payload)
  }

  render() {
    let blocks;
    if (this.props.blocks) {
      blocks = this.props.blocks.sort((a, b) => {
        return a.attributes.position - b.attributes.position
      }).map((block, index) => {
        let element = this.props.elements.filter((element) => {
          return element.type === block.relationships.element.data.type && element.id === block.relationships.element.data.id
        })[0];
        return <SortableBlockComponent block={ block } key={ block.id } blockUrl={ block.links.self } blocksUrl={ this.props.blocksUrl } destroyBlock={ this.destroyBlock } editElement={ this.editElement } element={ element } />
      })
    }
    let unitAddBlocksComponent;
    if (this.props.unit.attributes.updatable) {
      unitAddBlocksComponent = <UnitAddBlocksComponent setBlockForm={ this.setBlockForm }/>
    }
    return (
      <div className="panel panel--courses-list">
        <header style={{position: 'relative'}}>
          <h5>Sort blocks (drag and drop)</h5>
          { unitAddBlocksComponent }
        </header>
        <ul className="list-blank" data-sorter-url={ this.props.sorterUrl }>
          { blocks }
        </ul>
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
    blocks: state.blocks.blocks,
    elements: state.elements.elements,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortableBlocksComponent);
