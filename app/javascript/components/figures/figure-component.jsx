import React from 'react';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import FormFigureComponent from '../figures/form-figure-component';

class FigureComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let figure = this.props.figure;
    let style = {
      width: figure.attributes.imageWidth > 600 ? '100%' : 'auto'
    }
    if (figure.attributes.maxWidth) {
      style['maxWidth'] = figure.attributes.maxWidth + 'px';
    }
    let content = <div>
                    <BlockAdminButtonComponent block={this.props.block} element={this.props.figure} />
                    <figure>
                      <img src={ figure.attributes.imageUrl } alt={ figure.attributes.captionSanitized } style={ style } />
                      <figcaption dangerouslySetInnerHTML={{__html: figure.attributes.captionHtml }} />
                    </figure>
                  </div>;

    if (this.props.editingElement && this.props.editingElement === this.props.figure) {
      content = <FormFigureComponent
        element={ this.props.editingElement }
        unit={ this.props.unit }
        cancelForm={ this.props.cancelForm }
        url={ this.props.editingElement.links.self }
        method='patch'
        submitForm={ this.props.submitForm }
        success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
        errors={ this.props.errors }
      />;
    }

    return (content);
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

export default connect(mapStateToProps, mapDispatchToProps)(FigureComponent);
