import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import UnitIconComponent from './unit-icon-component';
import _ from 'lodash';

class UnitsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.setUrlParam = this.setUrlParam.bind(this);
  }

  setUrlParam(e) {
    e.preventDefault();
    let param = e.target.dataset.param;
    this.props.setUrlParam(param)
  }

  render() {
    let data = [];
    this.props.units.forEach((unit) => {
      data.push({
        title: unit,
        subjectTitle: unit.attributes.subjectTitle,
        // courseTitle: unit.attributes.courseTitle,
        // programTitle: unit.attributes.programTitle,
        minutes: unit.attributes.minutes,
        status: unit.attributes.status,
        reference: unit.attributes.reference,
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
            <br /><span className="badge badge-info admin">{ props.value.attributes.teacherName }</span>
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
      // {
      //   Header: 'Course',
      //   accessor: 'courseTitle', // String-based value accessors!
      //   filterMethod: (filter, row) => {
      //     let courseTitle = row['title'].attributes.courseTitle.toLowerCase();
      //     let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
      //     return courseTitle.match(downFilter);
      //   },
      // },
      // {
      //   Header: 'Program',
      //   accessor: 'programTitle', // String-based value accessors!
      //   filterMethod: (filter, row) => {
      //     let programTitle = row['title'].attributes.programTitle.toLowerCase();
      //     let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
      //     return programTitle.match(downFilter);
      //   },
      // },
      {
        Header: 'Duration (min)',
        Header: () => <div>Duration<br />(minutes)</div>,
        accessor: 'minutes' // String-based value accessors!
      },
      {
        Header: 'Reference',
        accessor: 'reference', // String-based value accessors!
        filterMethod: (filter, row) => {
          let reference = row['title'].attributes.reference.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return reference.match(downFilter);
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

    // , {
    //   Header: 'Age',
    //   accessor: 'age',
    //   Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    // }, {
    //   id: 'friendName', // Required because our accessor is not a string
    //   Header: 'Friend Name',
    //   accessor: d => d.friend.name // Custom value accessors!
    // }, {
    //   Header: props => <span>Friend Age</span>, // Custom header components!
    //   accessor: 'friend.age'
    // }]

    let myUnits;
    if (this.props.unitsParam === 'my_units') {
      myUnits = <li className='active'>
        My Units
      </li>
    } else {
      myUnits = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_units' >My Units</a>
      </li>
    }

    let mySubjects;
    if (this.props.unitsParam === 'my_subjects') {
      mySubjects = <li className='active'>
        In my Subjects
      </li>
    } else {
      mySubjects = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_subjects' >In my Subjects</a>
      </li>
    }

    let myCourses;
    if (this.props.unitsParam === 'my_courses') {
      myCourses = <li className='active'>
        In my Courses
      </li>
    } else {
      myCourses = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_courses' >In my Courses</a>
      </li>
    }

    let myPrograms;
    if (this.props.unitsParam === 'my_programs') {
      myPrograms = <li className='active'>
        In my Programs
      </li>
    } else {
      myPrograms = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_programs' >In my Programs</a>
      </li>
    }

    let allUnits;
    if (this.props.unitsParam === '') {
      allUnits = <li className='active'>
        All Units
      </li>
    } else {
      allUnits = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='' >All Units</a>
      </li>
    }

    let unitsNewLink = '';
    if (this.props.unitsNewUrl) {
      unitsNewLink = <a href={ this.props.unitsNewUrl } className='btn btn-primary' >Add</a>
    }

    return(
      <div>
        <div className="content-container masthead">
          <div className="content">
            <div className="masthead__info">
              <h1>Units</h1>
            </div>
            <div className="masthead__options">
              <div className="buttons">
                { unitsNewLink }
              </div>
            </div>
            <nav className="sub-nav">
              <ul>
                { myUnits }
                { mySubjects }
                { myCourses }
                { myPrograms }
                { allUnits }
              </ul>
            </nav>
          </div>
        </div>
        <div className="content-container">
          <div className="content">
            <div className="panel">
              <ReactTable
              className='-striped'
              data={data}
              columns={columns}
              loading={ this.props.loading }
              filterable={ true }
              sortable={ true }
              resizable={ true }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UnitsComponent;
