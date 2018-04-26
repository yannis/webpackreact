import React from 'react';
import moment from 'moment';

class ResourceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.destroyResource = this.destroyResource.bind(this);
    this.editResource = this.editResource.bind(this);
  }

  destroyResource(e) {
    e.preventDefault();
    // let blockId = e.target.dataset.block_id;
    // let blockUrl = e.target.dataset.block_url;
    if (window.confirm("Are you sure?")) {
      this.props.destroyResource({url: this.props.resource.links.self})
    }
  }

  editResource(e) {
    e.preventDefault();
    this.props.editResource(this.props.resource)
  }

  render() {
    const resource = this.props.resource;
    let linkUrl = resource.attributes.documentUrl || resource.attributes.url || resource.attributes.s3ExpiringUrl;
    let linkText = resource.attributes.defaultTitle;
    let linkBlank = resource.attributes.openBlank ? '_blank' : '_self';

    let destroyLink;
    let editLink;
    if (resource.attributes.destroyable) {
      destroyLink = <a href='#'
          onClick={this.destroyResource}
          data-block_id={resource.id}
          data-resource_url={resource.links.self}
          className="btn btn-secondary"
          title={'Destroy “' + linkText + '”?'}>Destroy</a>
    }
    if (resource.attributes.updatable) {
      editLink = <a href='#' onClick={this.editResource} data-block_id={resource.id} data-resource_url={resource.links.self} className="btn btn-secondary" >Edit</a>
    }

    return(
      <li data-id={resource.id} >
        <svg className="icon sz-18"><use xlinkHref={SpritePath + '#move'} /></svg>
        <div className="badge badge-pill badge-light">{resource.attributes.position}</div>
        <a href={linkUrl} target={linkBlank} title={linkText} className='link'>{linkText}</a>&nbsp;({linkUrl})
        <div className='btns'>
          {editLink}
          {destroyLink}
        </div>
      </li>
    )
  }
}

export default ResourceComponent;
