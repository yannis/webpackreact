import React from 'react';
import ReactDom, { render } from 'react-dom';
// import { connect } from 'react-redux';
import UnitsComponent from '../components/units/units-component';
import Rails from 'rails-ujs';
import _ from 'lodash';

class UnitsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      units: [],
      loading: false,
      unitsUrl: this.props.unitsUrl,
      unitsParam: this.props.unitsParam
    }
    this.fetchUnits = this.fetchUnits.bind(this)
    this.setUrlParam = this.setUrlParam.bind(this);
  }

  componentDidMount() {
    this.fetchUnits()
  }

  setUrlParam(param) {
    if (_.includes(['', 'my_units', 'my_subjects', 'my_courses', 'my_programs'], param)) {
      this.setState({
        unitsParam: param
      }, this.fetchUnits)
    }
  }

  fetchUnits() {
    this.setState({
      loading: true
    })
    const _this = this;
    $.ajax({
      url: _this.state.unitsUrl,
      method: 'GET',
      data: {
        in: this.state.unitsParam
      }
    }).done((response) => {
      _this.setState({
        units: response.data,
        loading: false
      })
    }).fail((data) => {
      alert('ERROR', data)
      _this.setState({
        loading: false
      })
    })
  }

  render() {
    return (
      <UnitsComponent
        units={ this.state.units }
        loading={ this.state.loading }
        unitsNewUrl={ this.props.unitsNewUrl }
        setUrlParam={ this.setUrlParam }
        unitsParam={ this.state.unitsParam }
      />
    );
  }
}

export default UnitsContainer;
