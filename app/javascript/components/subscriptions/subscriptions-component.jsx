import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment-timezone';

class SubscriptionsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subscriptions: []
    }
    this.setUrlParam = this.setUrlParam.bind(this);
  }

  setUrlParam(e) {
    e.preventDefault();
    let param = e.target.dataset.param;
    this.props.setUrlParam(param)
  }

  render() {
    let _this = this;

    const columns = [
      {
        Header: '',
        accessor: 'avatar',
        filterable: false,
        width: 80
      },
      {
        Header: 'Learner',
        accessor: 'learnerUsername',
      },
      {
        Header: 'email',
        accessor: 'learnerEmail',
      },
      {
        Header: 'Program',
        accessor: 'programTitle',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Started',
        accessor: 'startAt',
        filterable: false,
      },
      {
        Header: 'Exmatriculated',
        accessor: 'exmatriculatedAt',
        filterable: false,
      },
      {
        Header: () => <div style={{ textAlign: "right" }}>Completed</div>,
        accessor: 'completedAt',
        filterable: false,
        style: {
          textAlign: "right"
      },
      // {
      //   Header: () => <div style={{ textAlign: "right" }}>Updated</div>,
      //   accessor: 'updatedAt',
      //   filterable: false,
      //   style: {
      //     textAlign: "right"
      //   },
      }
    ]

    const timezone = $("meta[name='timezone']").attr('content')

    return(
      <div className="content-container">
        <div className="content">
          <div className="panel">
            <ReactTable
              className='-striped'
              columns={columns}
              loading={ this.props.loading }
              minRows={0}
              filterable={ true }
              sortable={ true }
              resizable={ true }
              data={this.state.data} // should default to []
              pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
              loading={this.state.loading}
              manual // informs React Table that you'll be handling sorting and pagination server-side
              onFetchData={(state, instance) => {
                this.setState({ loading: true })
                let sendData = {
                  in: _this.state.subscriptionsParam,
                  page: state.page + 1,
                  per_page: state.pageSize,
                  sorted: state.sorted,
                  filtered: state.filtered
                }
                // fetch your data
                $.ajax({
                  url: _this.props.subscriptionsUrl,
                  method: 'GET',
                  data: sendData
                }).done((response) => {
                  let data = [];
                  response.data.forEach((subscription) => {
                    let avatar;
                    let learnerUsername;
                    if (subscription.links.learner) {
                      avatar = <a href={subscription.links.learner} className='link'><img className='avatar' alt={subscription.attributes.learnerUsername} src={subscription.links.avatarMedium} /></a>;
                      learnerUsername = <div>
                        <a href={subscription.links.learner} className='link'>{subscription.attributes.learnerUsername}</a>
                        <br/>(<a href={subscription.links.self} className='link'><small>Subscription</small></a>)
                      </div>
                    } else {
                      avatar = <a href={subscription.links.self} className='link'><img className='avatar' alt={subscription.attributes.learnerUsername} src={subscription.links.avatarMedium} /></a>;
                      learnerUsername = <a href={subscription.links.self} className='link'>{subscription.attributes.learnerUsername}</a>
                    }

                    data.push({
                      avatar,
                      learnerUsername,
                      learnerEmail: subscription.attributes.learnerEmail,
                      programTitle: <a href={subscription.links.program} className='link'>{subscription.attributes.programTitle}</a>,
                      status: subscription.attributes.status,
                      startAt: moment(subscription.attributes.startAt).tz(timezone).format('DD-MM-YYYY HH:mm'),
                      completedAt: subscription.attributes.completedAt ? moment(subscription.attributes.startAt).tz(timezone).format('DD-MM-YYYY HH:mm') : null,
                      exmatriculatedAt: subscription.attributes.exmatriculatedAt ? moment(subscription.attributes.startAt).tz(timezone).format('DD-MM-YYYY HH:mm') : null,
                      updatedAt: moment(subscription.attributes.updatedAt).fromNow()
                    })
                  })
                  _this.setState({
                    data,
                    pages: response.meta.totalPages,
                    loading: false
                  })
                }).fail((data) => {
                  alert('ERROR', data)
                  _this.setState({
                    loading: false
                  })
                })
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SubscriptionsComponent;
