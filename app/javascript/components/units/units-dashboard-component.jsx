import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import UnitIconComponent from './unit-icon-component';
import _ from 'lodash';

class UnitsDashboardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      units: [],
      loading: true
    };
    this.fetchUnits = this.fetchUnits.bind(this);
  }

  componentDidMount() {
    this.fetchUnits();
  }

  fetchUnits() {
    this.setState({
      loading: true
    })
    const _this = this;
    $.ajax({
      url: _this.props.unitsUrl,
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
    let data = [];
    this.state.units.forEach((unit) => {
      data.push({
        title: unit,
        subjectTitle: unit.attributes.subjectTitle,
        courseTitle: unit.attributes.courseTitle,
        programTitle: unit.attributes.programTitle,
        status: unit.attributes.status,
        updatedAt: moment(unit.attributes.updatedAt).fromNow()
      })
    })

    const columns = [
      {
        Header: 'Unit',
        accessor: 'title',
        filterMethod: (filter, row) => {
          let downFullTitle = row['title'].attributes.fullTitle.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return downFullTitle.match(downFilter);
        },
        Cell: (props) => { return(
          <div className="icon-w-text">
            <UnitIconComponent iconLabel={ props.value.attributes.iconLabel } /> <strong><a href={props.value.links.self} className='link'>{ props.value.attributes.fullTitle }</a></strong>
            <br /><span className=" badge badge-info admin">{ props.value.attributes.teacherName }</span>
          </div>)
        }
      },
      {
        Header: 'Subject',
        accessor: 'subjectTitle', // String-based value accessors!
        filterMethod: (filter, row) => {
          let subjectTitle = row['title'].attributes.subjectTitle.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return subjectTitle.match(downFilter);
        },
      },
      {
        Header: 'Course',
        accessor: 'courseTitle', // String-based value accessors!
        filterMethod: (filter, row) => {
          let courseTitle = row['title'].attributes.courseTitle.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return courseTitle.match(downFilter);
        },
      },
      {
        Header: 'Program',
        accessor: 'programTitle', // String-based value accessors!
        filterMethod: (filter, row) => {
          let programTitle = row['title'].attributes.programTitle.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return programTitle.match(downFilter);
        },
      },
      {
        Header: 'Status',
        accessor: 'status', // String-based value accessors!
        Cell: (props) => {
          let klass = "unit-status is-" + (props.value == 'in review' ? 'review' : props.value);
          return(
            <div className="unit-status-w-text">
              <div className={klass}></div>
              <p>{ _.startCase(_.camelCase(props.value)) }</p>
            </div>
          )
        }
      },
      {
        Header: () => <div style={{ textAlign: "right" }}>Updated</div>,
        accessor: 'updatedAt', // String-based value accessors!
        filterable: false,
        style: {
          textAlign: "right"
        },
      }
    ]

    return(<ReactTable
      className='-striped'
      data={data}
      columns={columns}
      loading={ this.state.loading }
      filterable={ true }
      sortable={ true }
      resizable={ true }
    />)
  }
}

export default UnitsDashboardComponent;
