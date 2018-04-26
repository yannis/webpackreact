import React from 'react';
import ReactDom from 'react-dom';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import UnitPreviewComponent from './unit-preview-component';
import UnitBlocksComponent from './unit-blocks-component';
import UnitResourcesComponent from './unit-resources-component';
import UnitMetadataComponent from './unit-metadata-component';

class UnitComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'preview'
    }
    this.setTab = this.setTab.bind(this);

    this.addBlock = this.addBlock.bind(this);
    this.setBlocks = this.setBlocks.bind(this);
    this.setPagePreview = this.setPagePreview.bind(this);
    this.cancelFormBlock = this.cancelFormBlock.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.autosaveForm = this.autosaveForm.bind(this);
  }

  setTab(e) {
    e.preventDefault();
    this.setState({
      tab: e.target.dataset.tab
    });
  }

  setBlocks(blocks) {
    this.props.setBlocks(blocks)
  }

  setElements(elements) {
    this.props.setElements(elements)
  }

  setPagePreview(markdown) {
    if(markdown) {
      let html = LatexResistentMarkdownConverter.convert(markdown);
      this.props.showMarkdownPreview(html);
      return html
    }
  }

  setErrors() {
    let _this = this;
    let errors = [];
    if (this.props.formErrors) {
      errors = this.props.formErrors.filter((error) => {
        return error[0] === _this.state.form
      }).map((error) => {
        return error[1]
      })
      if (errors.length) {
        errors = errors[0]
      }
    }
    return errors
  }

  addBlock(block) {
    let blocks = this.props.blocks.concat([block.data]);
    let elements = this.props.elements.concat(block.included[0]);
    this.props.actions.setBlocks(blocks);
    this.props.actions.setElements(elements);
    this.cancelFormBlock();
  }

  cancelFormBlock(e) {
    if (e) { e.preventDefault(); }
    this.props.setBlockForm(null);
    this.props.editElement(null);
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

  autosaveForm(form, url, method) {
    let payload = {
      url,
      method,
      success: Actions.AUTOUPDATE_BLOCK_AND_ELEMENT,
      error: 'SET_FORM_ERROR',
      node: form,
      data: new FormData(form),
    }
    this.props.actions.fetchData(payload);
  }

  render() {
    let _this = this;
    let unit = this.props.unit;
    let blocks = this.props.blocks;
    let elements = this.props.elements;

    let previewSetTabLink;
    if (_.includes([undefined, 'preview'], this.state.tab)) {
      previewSetTabLink = <li className='list-inline-item active'>Preview</li>
    } else {
      previewSetTabLink = <li className='list-inline-item'><a href="#" onClick={ this.setTab } className='link' data-tab='preview'>Preview</a></li>
    }

    let blocksSetTabLink;
    if (this.state.tab === 'blocks') {
      blocksSetTabLink = <li className='list-inline-item active'>Blocks</li>
    } else {
      blocksSetTabLink = <li className='list-inline-item'><a href="#" onClick={ this.setTab } className='link' data-tab='blocks'>Blocks</a></li>
    }

    let resourcesSetTabLink;
    if (this.state.tab === 'resources') {
      resourcesSetTabLink = <li className='list-inline-item active'>Resources</li>
    } else {
      resourcesSetTabLink = <li className='list-inline-item'><a href="#" onClick={ this.setTab } className='link' data-tab='resources'>Resources</a></li>
    }

    let metadataSetTabLink;
    if (this.state.tab === 'metadata') {
      metadataSetTabLink = <li className='list-inline-item active'>Metadata</li>
    } else {
      metadataSetTabLink = <li className='list-inline-item'><a href="#" onClick={ this.setTab } className='link' data-tab='metadata'>Metadata</a></li>
    }

    let questionsSetTabLink;
    if (unit.attributes.questionsCount > 0) {
      questionsSetTabLink = <li className='list-inline-item'><a href='#unit-questions-title' className='link' data-turbolinks='false'>Questions<sup>{ unit.attributes.questionsCount }</sup></a></li>
    }

    let tabShown;
    switch (this.state.tab) {
      case 'preview':
        tabShown = <UnitPreviewComponent
          blocks={ blocks }
          elements={ elements }
          cancelForm={ this.cancelFormBlock }
          submitForm={ this.submitForm }
          autosaveForm={ this.autosaveForm }
        />
        break;
      case 'blocks':
        tabShown = <UnitBlocksComponent
          unit={ unit }
          onSort={ this.setBlocks }
          sorterUrl={ unit.links.blockSorter }
          blocks={ blocks }
          cancelForm={ this.cancelFormBlock }
          submitForm={ this.submitForm }
          autosaveForm={ this.autosaveForm }
        />;
        break;
      case 'resources':
        tabShown = <UnitResourcesComponent
            setBlockForm={ this.setBlockForm }
            unit={ unit }
            url={ unit.links.resources }
            sorterUrl={ unit.links.resourceSorter }
            resources={ this.props.resources }
            submitForm={ this.submitForm }
            resourcesBucket={this.props.resourcesBucket}
          />;
        break;
      case 'metadata':
        tabShown =  <UnitMetadataComponent
            unit={ unit }
            metadata={ unit.attributes.metadataHtml }
            submitForm={ this.submitForm }
          />
        break;
      default:
        tabShown = <UnitPreviewComponent
          blocks={ blocks }
          elements={ elements }
          cancelForm={ this.cancelFormBlock }
          submitForm={ this.submitForm }
          autosaveForm={ this.autosaveForm }
        />
    }


    // let pagePreview;
    // if (this.props.pagePreview) {
    //   pagePreview = <div className="panel"><div className='page_preview' dangerouslySetInnerHTML={{__html: this.props.pagePreview }} /></div>
    // }
    return (
      <div>
        <div className="content-container sub-nav--standalone">
          <div className="content">
            <ul className="sub-nav">
              {previewSetTabLink}
              {blocksSetTabLink}
              {resourcesSetTabLink}
              {metadataSetTabLink}
              {questionsSetTabLink}
            </ul>
          </div>
        </div>
        <div className="content">
          { tabShown}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.forms.errors,
    resources: state.resources.resources,
    reviews: state.reviews.reviews
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnitComponent);
