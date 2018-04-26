import React from 'react';
import ReactDom, { render } from 'react-dom';
import { connect } from 'react-redux';
import SubscriptionsComponent from '../components/subscriptions/subscriptions-component';
import _ from 'lodash';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

class SubscriptionsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      loading: false,
      subscriptionsUrl: this.props.subscriptionsUrl,
      subscriptionsParam: this.props.subscriptionsParam
    }
    this.fetchSubscriptions = this.fetchSubscriptions.bind(this)
    this.setUrlParam = this.setUrlParam.bind(this)
  }

  componentDidMount() {
    this.fetchSubscriptions()
    this.props.actions.fetchSubscriptions(this.props.subscriptionsUrl);
  }

  setUrlParam(param) {
    if (_.includes(['', 'my_subscriptions', 'my_courses', 'my_programs'], param)) {
      this.setState({
        subscriptionsParam: param
      }, this.fetchSubscriptions)
    }
  }

  fetchSubscriptions() {
    this.setState({
      loading: true
    })
    const _this = this;
    $.ajax({
      url: _this.props.subscriptionsUrl,
      method: 'GET',
      data: {
        in: _this.state.subscriptionsParam
      }
    }).done((response) => {
      _this.setState({
        subscriptions: response.data,
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
      <SubscriptionsComponent
        subscriptions={ this.state.subscriptions }
        loading={ this.state.loading }
        setUrlParam={ this.setUrlParam }
        subscriptionsParam={ this.state.subscriptionsParam }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    // unitUrl: state.units.url,
    subscriptions: state.subscriptions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsContainer);
