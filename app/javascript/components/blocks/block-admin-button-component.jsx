import React from 'react';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BlockAdminButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.destroyBlock = this.destroyBlock.bind(this);
    this.editElement = this.editElement.bind(this);
  }

  destroyBlock(e) {
    e.preventDefault();
    let blockId = e.target.dataset.block_id;
    let blockUrl = e.target.dataset.block_url;
    if (window.confirm("Are you sure you want to delete “" + this.props.block.attributes.fullTitle + "”?")) {
      this.props.actions.destroyBlock({id: blockId, url: blockUrl})
    }
  }

  editElement(e) {
    e.preventDefault();
    this.props.actions.editElement(this.props.element)
  }

  render() {
    let block = this.props.block;
    let destroyLink;
    let editLink;
    if (block.attributes.destroyable) {
      destroyLink = <a  href='#'
                        className='dropdown-item'
                        onClick={ this.destroyBlock }
                        data-block_id={ block.id }
                        data-block_url={ block.links.self }
                        aria-hidden="true"
                        title={ 'Destroy “' + this.props.block.attributes.fullTitle + '”?'}>Destroy</a>
    }
    if (block.attributes.updatable) {
      editLink = <a href='#' className='dropdown-item' onClick={ this.editElement } data-block_id={ block.id } data-block_url={ block.links.self }>Edit</a>
    }
    return (
      <div className="dropdown block-admin-dropdown">
        <a href='#' onClick={ this.toggle } className="dropdown-toggle btn btn-primary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <svg className="icon sz-24 is-light">
            <use xlinkHref={ SpritePath + '#menu' }></use>
          </svg>
        </a>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          { editLink }
          { destroyLink}
        </div>
      </div>
    )
  }
}
//
// function  mapStateToProps(state) {
//   return {
//     blocks: state.blocks.blocks,
//     elements: state.elements.elements,
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(BlockAdminButtonComponent);
