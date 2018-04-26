import React from 'react';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import FormPageComponent from '../pages/form-page-component';

class PageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.cancelForm = this.cancelForm.bind(this)
  }

  cancelForm(e) {
    e.preventDefault();
    this.props.cancelForm();
  }

  render() {
    let content = <div>
      <BlockAdminButtonComponent block={this.props.block} element={this.props.page} />
      <div dangerouslySetInnerHTML={{__html: this.props.page.attributes.descriptionHtml }} />
    </div>;
    if ((this.props.editingElement ? this.props.editingElement.id : 'null') === this.props.page.id) {
      content = <FormPageComponent
        element={ this.props.editingElement }
        unit={ this.props.unit }
        cancelForm={ this.cancelForm }
        url={ this.props.editingElement.links.self }
        method='patch'
        submitForm={ this.props.submitForm }
        success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
        autosaveForm={ this.props.autosaveForm }
        errors={ this.props.errors }
      />;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

function  mapStateToProps(state) {
  return {
    unit: state.units.unit,
    editingElement: state.elements.editingElement,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageComponent);
