import React from 'react';
import ReactDom from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResourceComponent from '../resources/resource-component';
import ResourceFormComponent from '../resources/resource-form-component';
import autosize from 'autosize/dist/autosize.js';
import Sortable from 'sortablejs';

class UnitResourcesComponent extends React.Component {

  constructor(props) {
    super(props);
    // this.addResource = this.addResource.bind(this);
    this.setSortable = this.setSortable.bind(this);
    this.destroyResource = this.destroyResource.bind(this);
    this.editResource = this.editResource.bind(this);
    this.setResourceForm = this.setResourceForm.bind(this);
    this.cancelFormResource = this.cancelFormResource.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.setSortable()
  }

  componentDidUpdate() {
    this.setSortable()
  }

  setSortable() {
    let _this = this;
    const node = ReactDom.findDOMNode(this).getElementsByTagName('ul')[0];
    if (node) {
      Sortable.create(node, {
        // handle: ".fa-sort",
        onUpdate(event)  {
          let itemEl = event.item;  // dragged HTMLElement
          let url = this.el.dataset.sorterUrl;
          let ids = $(this.el.children).map((index, li) => {
            return li.dataset.id;
          }).toArray();
          _this.props.actions.sortResources({
            url,
            data: {
              ids
            }
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
    this.props.submitForm(e, url, method, success)
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
    let unit = this.props.unit;
    let resources = <p>No resources yet</p>;
    let panelClass = 'panel panel--text';
    let panelTitle = 'Resources';
    let addResourceButton = <a className="btn btn-primary" onClick={ this.setResourceForm } href="#" data-block_type='resources'>Add</a>;
    if (this.props.resources.length) {
      resources = this.props.resources.sort((a, b) => {
        return a.attributes.position - b.attributes.position
      }).map((resource, index) => {
        return(<ResourceComponent resource={ resource } key={ resource.id } destroyResource={ this.destroyResource } editResource={ this.editResource } />)
      })
      resources = <ul className='list-group' data-sorter-url={ this.props.sorterUrl }>{ resources }</ul>;
      panelClass = 'panel panel--courses-list';
    }
    if (this.props.addingResource) {
      panelTitle = 'Add resource';
      panelClass = 'panel panel--form';
      addResourceButton = '';
      resources = <ResourceFormComponent
        unit={ unit }
        url={ unit.links.self + '/resources' }
        method='post'
        cancelForm={ this.cancelFormResource }
        submitForm={ this.submitForm }
        success={ Actions.ADD_RESOURCE }
        errors={ this.props.errors }
        resourcesBucket={this.props.resourcesBucket}
      />;
    }
    if (this.props.editingResource) {
      let resource = this.props.editingResource;
      panelTitle = 'Edit resource';
      panelClass = 'panel panel--form';
      addResourceButton = '';
      resources = <ResourceFormComponent
        element={ resource }
        unit={ unit }
        cancelForm={ this.cancelFormResource }
        url={ resource.links.self }
        method='patch'
        submitForm={ this.submitForm }
        success={ Actions.UPDATE_RESOURCE }
        errors={ this.props.errors }
        resourcesBucket={this.props.resourcesBucket}
      />;
    }
    return(
      <div className={panelClass}>
        <header>
          <h5>{panelTitle}</h5>
          {addResourceButton}
        </header>
        { resources }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.forms.errors,
    blockForm: state.blocks.blockForm,
    unit: state.units.unit,
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

export default connect(mapStateToProps, mapDispatchToProps)(UnitResourcesComponent);
