import React from 'react';
import ReactDom, { render } from 'react-dom';
// import { connect } from 'react-redux';
import SubjectsComponent from '../components/subjects/subjects-component';
import Rails from 'rails-ujs';
import _ from 'lodash';

class SubjectsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loading: false,
      subjectsUrl: this.props.subjectsUrl,
      subjectsParam: this.props.subjectsParam
    }
    this.fetchSubjects = this.fetchSubjects.bind(this)
    this.setUrlParam = this.setUrlParam.bind(this)
  }

  componentDidMount() {
    this.fetchSubjects()
  }

  setUrlParam(param) {
    if (_.includes(['', 'my_subjects', 'my_courses', 'my_programs'], param)) {
      this.setState({
        subjectsParam: param
      }, this.fetchSubjects)
    }
  }

  fetchSubjects() {
    this.setState({
      loading: true
    })
    const _this = this;
    $.ajax({
      url: _this.props.subjectsUrl,
      method: 'GET',
      data: {
        in: _this.state.subjectsParam
      }
    }).done((response) => {
      _this.setState({
        subjects: response.data,
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
      <SubjectsComponent
        subjects={ this.state.subjects }
        loading={ this.state.loading }
        subjectsNewUrl={ this.props.subjectsNewUrl }
        setUrlParam={ this.setUrlParam }
        subjectsParam={ this.state.subjectsParam }
      />
    );
  }
}

export default SubjectsContainer;
