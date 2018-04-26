import React from 'react';
import { render } from 'react-dom';
import { Base64 } from 'js-base64';

class IdcheckComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      frontImage: null,
      backImage: null,
      frontImagePreviewUrl: null,
      backImagePreviewUrl: null,
      loading: false,
      error: null
    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    const input = e.target;
    let file = input.files[0];


    reader.onloadend = () => {
      if (input.dataset.side === 'frontImage') {
        this.setState({
          frontImage: reader.result.replace(/data:image\/.+;base64,/g,''),
          frontImagePreviewUrl: reader.result,
        });
      } else {
        this.setState({
          backImage: reader.result.replace(/data:image\/.+;base64,/g,''),
          backImagePreviewUrl: reader.result,
        });
      }
    }
    reader.readAsDataURL(file)
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({
      loading: true
    })
    let _this = this;

    let data = {
      frontImage: this.state.frontImage,
      backImage: this.state.backImage,
      rectoImageCropped: true,
      signatureImageCropped: true,
      faceImageCropped: true
    }
    $.ajax({
      beforeSend(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + 'ZXBmbEBhcmlhZG5leHQuY29tOmJhaHhhZjZpZUo=');
        xhr.setRequestHeader("Accept-Language", 'en');
      },
      type: "POST",
      url: 'https://sandbox.idcheck.io/rest/v0/task/image?asyncMode=True',
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      data: JSON.stringify(data),
      success(data) {
        $.ajax({
          type: "POST",
          url: _this.props.callbackUrl,
          data: {
            idcheck_task: {
              uid: data.uid,
              started: data.started,
              redirect_url: data.redirectUrl,
            }
          },
          success() {
            window.location = "/learn"
          },
        });
      },
      error(e) {
        console.log(e);
      }
    })
  }

  render() {
    let errors = this.state.errors;

    let front_image_attributes_data_input_name = "idcheck[frontImage]";
    let front_image_attributes_data_form_group_class = "form-group";
    let front_image_attributes_data_input_class = "form-control";
    let front_image_attributes_data_input_errors = [];
    if (errors) {
      front_image_attributes_data_form_group_class = front_image_attributes_data_form_group_class + ' has-danger';
      front_image_attributes_data_input_class = front_image_attributes_data_input_class + ' form-control-danger';
      $.each(errors, function(i, error) {
        front_image_attributes_data_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }
    let { frontImagePreviewUrl } = this.state;
    let $frontImagePreview;
    if (frontImagePreviewUrl) {
      $frontImagePreview = (<div><img className='id-validator-preview' src={frontImagePreviewUrl} /></div>);
    }

    let back_image_attributes_data_input_name = "idcheck[backImage]";
    let back_image_attributes_data_form_group_class = "form-group";
    let back_image_attributes_data_input_class = "form-control";
    let back_image_attributes_data_input_errors = [];
    if (errors) {
      back_image_attributes_data_form_group_class = back_image_attributes_data_form_group_class + ' has-danger';
      back_image_attributes_data_input_class = back_image_attributes_data_input_class + ' form-control-danger';
      $.each(errors, function(i, error) {
        back_image_attributes_data_input_errors.push(<div key={ i } className="form-control-feedback">{error}</div>)
      })
    }
    let { backImagePreviewUrl } = this.state;
    let $backImagePreview;
    if (backImagePreviewUrl) {
      $backImagePreview = (<div><img className='id-validator-preview' src={backImagePreviewUrl} /></div>);
    }

    return(
      <div className='panel panel--form'>
        <header>
          <h5>Submit front and back images of your Photo ID</h5>
        </header>
        <form onSubmit={ this.submitForm } className='form'>
          <div className='form-group'>
            { $frontImagePreview }
            <label className='form-control-label' >
              Front Image <span className='red_star'>*</span>
              <input type="file" onChange={ this.handleImageChange } name={ front_image_attributes_data_input_name } className={ front_image_attributes_data_input_class } data-side='frontImage' />
            </label>
            { front_image_attributes_data_input_errors }
          </div>
          <div className='form-group'>
            { $backImagePreview }
            <label className='form-control-label' >
              Back Image <span className='red_star'>*</span>
              <input type="file" onChange={ this.handleImageChange } name={ back_image_attributes_data_input_name } className={ back_image_attributes_data_input_class } data-side='backImage' />
            </label>
            { back_image_attributes_data_input_errors }
          </div>
          <div className="actions">
            <button className='btn btn-primary'>Continue to next step</button>
          </div>
        </form>
      </div>
  )}
}

document.addEventListener("turbolinks:load", () => {
  let idcheckElement = document.getElementById('idcheck-component');
  if (idcheckElement) {
    let callbackUrl = idcheckElement.dataset.callbackUrl;
    // let teachersUrl = idcheckElement.dataset.teachersUrl;
    render(<IdcheckComponent callbackUrl={callbackUrl} />, idcheckElement);
  }
})

export default IdcheckComponent;
