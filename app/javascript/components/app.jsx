import React from 'react';
import UnitComponent from './units/unit-component';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return(
      <div>
        <UnitComponent
          unitUrl={ this.props.unitUrl }
        />
      </div>
    )
  }
}

function  mapStateToProps(state) {
  return {
    unitUrl: state.blockForm.unitUrl
  }
}

export default connect(mapStateToProps)(App);
