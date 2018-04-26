import React from 'react';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlockAdminButtonComponent from '../blocks/block-admin-button-component';
import YoutubePlayer from '../video-player-component';
import FormVideoComponent from '../videos/form-video-component';

class VideoComponent extends React.Component {

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
      <BlockAdminButtonComponent block={this.props.block} element={this.props.element} />
      <YoutubePlayer videoId={ this.props.element.attributes.videoId } />
    </div>;

    if (this.props.editingElement === this.props.element) {
      content = <FormVideoComponent
        element={ this.props.editingElement }
        unit={ this.props.unit }
        cancelForm={ this.cancelForm }
        url={ this.props.editingElement.links.self }
        method='patch'
        submitForm={ this.props.submitForm }
        success= { Actions.UPDATE_BLOCK_AND_ELEMENT }
        errors={ this.props.errors }
        teachers={ this.props.teachers }
      />;
    }

    return (
      <div>
        { content }
      </div>
    );
  }

  // _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }
}


function  mapStateToProps(state) {
  return {
    unit: state.units.unit,
    editingElement: state.elements.editingElement,
    teachers: state.teachers.teachers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent);
