import React from 'react';
import FormErrorsComponent from '../form-errors-component';

class FormVideoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    this.props.submitForm(e, this.props.url, this.props.method, this.props.success)
  }

  render() {

    let errors = this.props.errors || {};

    let teacher_select_options = [<option key='-1'></option>]
    this.props.teachers.forEach((teacher, index) => {
      teacher_select_options.push(<option value={ teacher.id } key={ index }>{ teacher.attributes.fullName }</option>)
    })

    let video_id_input_name = "video[video_id]";
    let video_id_input_id = "video_video_id";
    let video_id_form_group_class = "form-group";
    let video_id_input_class = "video_video_id form-control";
    let video_id_input_value = this.props.element ? this.props.element.attributes.videoId : null ;
    let video_id_input_errors = [];
    if (errors.video_id) {
      video_id_form_group_class = video_id_form_group_class + ' has-danger';
      video_id_input_class = video_id_input_class + ' form-control-danger';
      $.each(errors.video_id, function(i, error) {
        video_id_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }

    let course_developer_id_select_name = "video[course_developer_id]";
    let course_developer_id_select_id = "video_course_developper";
    let course_developer_id_form_group_class = "form-group";
    let course_developer_id_select_class = "video_course_developper form-control";
    let course_developer_id_select_value = this.props.element ? this.props.element.attributes.courseDeveloperId : null ;
    let course_developer_id_select_errors = [];
    if (errors.course_developper) {
      course_developper_form_group_class = course_developper_form_group_class + ' has-danger';
      course_developer_id_select_class = course_developer_id_select_class + ' form-control-danger';
      $.each(errors.course_developper, function(i, error) {
        course_developer_id_select_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }
    let course_developer_id_select = <select name={ course_developer_id_select_name } id={ course_developer_id_select_id } className={ course_developer_id_select_class } defaultValue={ course_developer_id_select_value }>{ teacher_select_options }</select>

    let speaker_id_select_name = "video[speaker_id]";
    let speaker_id_select_id = "video_speaker";
    let speaker_id_form_group_class = "form-group";
    let speaker_id_select_class = "video_speaker form-control";
    let speaker_id_input_value = this.props.element ? this.props.element.attributes.speakerId : null ;
    let speaker_id_select_errors = [];
    if (errors.speaker) {
      speaker_form_group_class = speaker_form_group_class + ' has-danger';
      speaker_id_select_class = speaker_id_select_class + ' form-control-danger';
      $.each(errors.speaker, function(i, error) {
        speaker_id_select_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }
    let speaker_id_select = <select name={ speaker_id_select_name } id={ speaker_id_select_id } className={ speaker_id_select_class } defaultValue={ speaker_id_input_value }>{ teacher_select_options }</select>

    const buttonText = this.props.element ? 'Update video' : 'Add video'
    const titleText = this.props.element ? 'Edit “' + this.props.element.attributes.fullTitle + '”' : 'Add video';

    return (
      <div className='panel panel--form'>
        <header>
          <h5>{ titleText }</h5>
        </header>
        <form onChange={ this.setValue } onSubmit={ this.submitForm } className='form form-full-width'>
          <div className={ video_id_form_group_class }>
            <label className='form-control-label' htmlFor={ video_id_input_id } >Youtube ID <span className='red_star'>*</span></label>
            <input type="text" id={ video_id_input_id } name={ video_id_input_name } className={ video_id_input_class } defaultValue={ video_id_input_value } required />
            { video_id_input_errors }
          </div>
          <div className={ course_developer_id_form_group_class }>
            <label className='form-control-label' htmlFor={ course_developer_id_select_id } >Course developper</label>
            { course_developer_id_select }
            { course_developer_id_select_errors }
          </div>
          <div className={ speaker_id_form_group_class }>
            <label className='form-control-label' htmlFor={ speaker_id_select_id } >Speaker</label>
            { speaker_id_select }
            { speaker_id_select_errors }
          </div>
          <div className="actions">
            <button className='btn btn-primary'>{ buttonText }</button> or <a href='#' className='link' onClick={ this.props.cancelForm }>cancel</a>
          </div>
        </form>
      </div>
    )
  }
}

export default FormVideoComponent;
