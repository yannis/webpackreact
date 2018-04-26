import React from 'react';

class SortableBlockComponent extends React.Component {
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
      this.props.destroyBlock({id: blockId, url: blockUrl})
    }
  }

  editElement(e) {
    e.preventDefault();
    this.props.editElement(this.props.element)
  }

  render() {
    let block = this.props.block;
    let destroyLink;
    let editLink;
    if (block.attributes.destroyable) {
      destroyLink = <a  onClick={ this.destroyBlock }
                        data-block_id={ block.id }
                        data-block_url={ block.links.self }
                        className="btn btn-secondary"
                        title={ 'Destroy “' + this.props.block.attributes.fullTitle + '”?'}>Destroy</a>
    }
    if (block.attributes.updatable) {
      editLink = <a href='#' onClick={ this.editElement } data-block_id={ block.id } data-block_url={ block.links.self } className="btn btn-secondary" >Edit</a>
    }
    return (
      <li data-id={ block.id } >
        <svg className="icon sz-18"><use xlinkHref={ SpritePath + '#move' } /></svg>
        <div className="badge badge-pill badge-light">{ block.attributes.position }</div>
        <a href={ block.links.element } className='link'>{ block.attributes.fullTitle || block.attributes.title }</a>
        <div className='btns'>
          { editLink }
          { destroyLink }
        </div>
      </li>
    )
  }
}

export default SortableBlockComponent;
