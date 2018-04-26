import React from 'react';
import { render } from 'react-dom';
import Flash from '../../utilities/flash';
import Webcam from '@cliener/react-webcam';

class SelfieComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image: null,
      imagePreviewUrl: null,
      live: true,
      errors: JSON.parse(props.errors) || {},
      submitting: false
    }
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
    this.setLive = this.setLive.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imagePreviewUrl = this.webcam.getScreenshot();
    if (!imagePreviewUrl) {
      this.setState({
        errors: {
          'Picture': ['It seems that you haven\'t submitted any image. Please check your webcam settings.']
        }
      });
    } else {
      this.setState({
        live: false,
        imagePreviewUrl
      });
    }
  }

  setLive(e) {
    e.preventDefault();
    let live = e.target.dataset.live;
    this.setState({
      live
    });
  }

  submitForm(e) {
    e.preventDefault();
    const _this = this;
    this.setState({
      submitting: true
    });
    $.ajax({
      beforeSend: function(xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) } ,
      url: '/learn/selfies',
      type: 'post',
      dataType: 'json',
      data: {
        selfie: {
          picture: _this.state.imagePreviewUrl
        }
      }
    }).done( (response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, xhr);
      _this.setState({
        errors: null,
        submitting: false
      })
      window.location = '/learn'
    }).fail( (response, message, xhr) => {
      Flash.handleFlashMessagesHeader(window.flashDiv, response);
      _this.setState({
        errors: response.responseJSON.errors,
        submitting: false
      })
    });
  }

  render() {
    let imagePreview;

    let errors = this.state.errors;
    let errorElements = [];

    if (errors) {
      $.each(errors, function(type, value) {
        $.each(value, function(i, error) {
          errorElements.push(<p key={ i } className="text-danger">{ type }: {error}</p>)
        })
      })
    }

    if (this.state.live) {
      imagePreview = <div>
        {errorElements}
        <Webcam
          audio={false}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
        />
        <div className="form-group row">
          <div className="col">
            <button className='btn btn-primary' onClick={this.capture}>Capture selfie</button>
          </div>
        </div>
      </div>
    } else {
      let buttonText = 'Continue to next step';
      if (this.state.submitting) {
        buttonText = 'Submitting…'
      }
      imagePreview = <form>
        <div className="form-group">
          <img src={this.state.imagePreviewUrl} />
        </div>
        <div className="form-group row">
          <div className="col">
            { errorElements }
            <input type='submit' className='btn btn-primary' onClick={this.submitForm} value={buttonText} disabled={this.state.submitting} /> <button className='btn btn-info' onClick={this.setLive} data-live={false}>Retake</button>
          </div>
        </div>
      </form>
    }
    return(
      <div className='content'>
        <div className='panel panel--form'>
          { imagePreview }
        </div>
      </div>
  )}
}

document.addEventListener("turbolinks:load", () => {
  let selfieElement = document.getElementById('selfie-component');
  if (selfieElement) {
    let errors = selfieElement.dataset.errors;
    // let teachersUrl = selfieElement.dataset.teachersUrl;
    render(<SelfieComponent errors={errors} />, selfieElement);
  }
})

export default SelfieComponent;
