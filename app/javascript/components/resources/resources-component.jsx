import React from 'react';
import ReactDom from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResourceComponent from './resource-component';
import ResourceFormComponent from './resource-form-component';
import autosize from 'autosize/dist/autosize.js';
import Sortable from 'sortablejs';

class ResourcesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.setSortable = this.setSortable.bind(this);
    this.destroyResource = this.destroyResource.bind(this);
    this.editResource = this.editResource.bind(this);
    this.setResourceForm = this.setResourceForm.bind(this);
    this.cancelFormResource = this.cancelFormResource.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    let payload = {
      url: this.props.url,
      method: 'get',
      success: 'SET_RESOURCES',
      error: 'SET_FORM_ERROR',
    }
    this.props.actions.fetchData(payload);
    this.setSortable();
  }

  componentDidUpdate() {
    this.setSortable();
  }

  setSortable() {
    let _this = this;
    const node = ReactDom.findDOMNode(this).getElementsByTagName('ul')[0];
    if (node) {
      Sortable.create(node, {
        onUpdate(event) {
          let itemEl = event.item;  // dragged HTMLElement
          let url = this.el.dataset.sorterUrl;
          let ids = $(this.el.children).map((index, li) => {
            return li.dataset.id;
          }).toArray();
          _this.props.actions.sortResources({
            url,
            data: { ids }
          })
        },
      });
    }
  }

  setResourceForm(e) {
    e.preventDefault();
    this.props.actions.editResource(null);
    this.props.actions.setResourceForm(true);
  }

  submitForm(e, url, method, success) {
    e.preventDefault();
    let form = e.target;
    let payload = {
      url,
      method,
      success,
      error: 'SET_FORM_ERROR',
      node: form,
      data: new FormData(form),
    }
    this.props.actions.fetchData(payload);
  }

  cancelFormResource(e) {
    if (e) { e.preventDefault(); }
    this.props.actions.editResource(null);
    this.props.actions.setResourceForm(false);
  }

  destroyResource(payload) {
    this.props.actions.fetchData({
      url: payload.url,
      method: 'delete',
      success: Actions.REMOVE_RESOURCE
    })
  }

  editResource(resource) {
    this.props.actions.editResource(resource)
  }

  render() {
    let resources = <p>No resources yet</p>;
    let panelClass = 'panel panel--text';
    let panelTitle = 'Resources';
    let addResourceButton = <a className="btn btn-primary" onClick={this.setResourceForm} href="#" data-block_type='resources'>Add</a>;
    if (this.props.resources.length) {
      resources = this.props.resources.sort((a, b) => {
        return a.attributes.position - b.attributes.position
      }).map((resource, index) => {
        return (<ResourceComponent resource={resource} key={index} destroyResource={this.destroyResource} editResource={this.editResource} />)
      })
      resources = <ul className='list-group' data-sorter-url={this.props.sorterUrl}>{resources}</ul>;
      panelClass = 'panel panel--courses-list';
    }
    if (this.props.addingResource) {
      panelTitle = 'Add resource';
      panelClass = 'panel panel--form';
      addResourceButton = '';
      resources = <ResourceFormComponent
        url={this.props.url}
        method='post'
        cancelForm={this.cancelFormResource}
        submitForm={this.submitForm}
        success={Actions.ADD_RESOURCE}
        errors={this.props.errors}
        resourcesBucket={this.props.resourcesBucket}
      />;
    }
    if (this.props.editingResource) {
      let resource = this.props.editingResource;
      panelTitle = 'Edit resource';
      panelClass = 'panel panel--form';
      addResourceButton = '';
      resources = <ResourceFormComponent
        element={resource}
        cancelForm={this.cancelFormResource}
        url={resource.links.self}
        method='patch'
        submitForm={this.submitForm}
        success={Actions.UPDATE_RESOURCE}
        errors={this.props.errors}
        resourcesBucket={this.props.resourcesBucket}
      />;
    }
    return (
      <div className={panelClass}>
        <header>
          <h5>{panelTitle}</h5>
          {addResourceButton}
        </header>
        {resources}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.forms.errors,
    addingResource: state.resources.addingResource,
    editingResource: state.resources.editingResource,
    resources: state.resources.resources,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesComponent);
