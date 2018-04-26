import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment';

class SubjectsComponent extends React.Component {

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
    this.props.subjects.forEach((subject) => {
      data.push({
        title: subject,
        courseTitle: subject.attributes.courseTitle,
        programTitle: subject.attributes.programTitle,
        reference: subject.attributes.reference,
        updatedAt: moment(subject.attributes.updatedAt).fromNow()
      })
    })

    const columns = [
      {
        Header: 'Subject',
        accessor: 'title', // String-based value accessors!
        filterMethod: (filter, row) => {
          let downFullTitle = row['title'].attributes.fullTitle.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return downFullTitle.match(downFilter);
        },
        Cell: (props) => { return(
                            <span>
                              <a href={props.value.links.self} className='link'>{ props.value.attributes.fullTitle }</a>
                              <br />
                              <div className="badge badge-primary">{ props.value.attributes.teacherName }</div>
                            </span>)
                          }
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
        Header: 'Reference',
        accessor: 'reference', // String-based value accessors!
        filterMethod: (filter, row) => {
          let reference = row['title'].attributes.reference.toLowerCase();
          let downFilter = new RegExp(filter.value.toLowerCase(), 'g');
          return reference.match(downFilter);
        },
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

    let mySubjects;
    if (this.props.subjectsParam === undefined || this.props.subjectsParam === 'my_subjects') {
      mySubjects = <li className='active'>
        My Subjects
      </li>
    } else {
      mySubjects = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_subjects' >My Subjects</a>
      </li>
    }

    let myCourses;
    if (this.props.subjectsParam === 'my_courses') {
      myCourses = <li className='active'>
        Subjects in my Courses
      </li>
    } else {
      myCourses = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_courses' >Subjects in my Courses</a>
      </li>
    }

    let myPrograms;
    if (this.props.subjectsParam === 'my_programs') {
      myPrograms = <li className='active'>
        Subjects in my Programs
      </li>
    } else {
      myPrograms = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='my_programs' >Subjects in my Programs</a>
      </li>
    }

    let allSubjects;
    if (this.props.subjectsParam === '') {
      allSubjects = <li className='active'>
        All Subjects
      </li>
    } else {
      allSubjects = <li>
        <a href="#" onClick={ this.setUrlParam } data-param='' >All Subjects</a>
      </li>
    }

    return(
      <div>
        <div className="content-container masthead">
          <div className="content">
            <div className="masthead__info">
              <h1>Subjects</h1>
            </div>
            <div className="masthead__options">
              <div className="buttons">
                <a href={ this.props.subjectsNewUrl } className='btn btn-primary' >Add</a>
              </div>
            </div>
            <nav className="sub-nav">
              <ul>
                { mySubjects }
                { myCourses }
                { myPrograms }
                { allSubjects }
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

export default SubjectsComponent;
