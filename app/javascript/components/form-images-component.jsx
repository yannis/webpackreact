import React from 'react';
import { render } from 'react-dom';

class FormImagesComponent extends React.Component {

  componentDidMount() {}

  render() {
    let addNewImagesComponent = <AddNewImagesComponent
        objectType={ this.props.objectType }
        objectId={ this.props.objectId }
        imagesCount={ this.props.images.length }
        text={ this.props.text } />;
    return(
      <div>
        <EditFormImagesComponent
          images={ this.props.images }
          objectType={ this.props.objectType }
          objectId={ this.props.objectId } />
        { addNewImagesComponent }
      </div>
    )
  }
}

class EditFormImagesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: JSON.parse(this.props.images),
      loadingFlag: false
    };
  }

  render() {
    var images = [];
    var objectId = this.props.objectId;
    var objectType = this.props.objectType;
    this.state.images.forEach(function(image, index) {
      images.push(<EditImageComponent
                    image={ image }
                    key={ index }
                    objectType={ objectType }
                    objectId={ objectId } />);
    });
    return (
      <div>
        {images}
      </div>
    );
  }
}

class DestroyImageComponent extends React.Component {

  render() {
    var image = this.props.image;
    var id_input_name = this.props.objectType+"[images_attributes]["+image.id+"][id]";
    var destroy_input_name = this.props.objectType+"[images_attributes]["+image.id+"][_destroy]";
    return (
      <div>
        <input type="hidden" name={ id_input_name } value={ image.id } />
        <input type="hidden" name={ destroy_input_name } value="1" />
      </div>
    )
  }
}


class EditImageComponent extends React.Component {

  render() {
    let image = this.props.image;

    let id_input_name = this.props.objectType+"[images_attributes]["+image.id+"][id]";

    let destroy_input_name = this.props.objectType+"[images_attributes]["+image.id+"][_destroy]";
    let destroy_input_id = this.props.objectType+"_images_attributes_"+image.id+"_destroy";

    let description_input_name = this.props.objectType+"[images_attributes]["+image.id+"][description]";
    let description_input_id = this.props.objectType+"_images_attributes_"+image.id+"_description";

    let metadata_input_name = this.props.objectType+"[images_attributes]["+image.id+"][metadata]";
    let metadata_input_id = this.props.objectType+"_images_attributes_"+image.id+"_metadata";

    let markdown_text = "![Alt text](" + image.largeUrl + " 'Optional title')"
    return (
      <div className='row image'>
        <div className="col-sm-3 col-md-3">
          <input type="hidden" name={ id_input_name } value={ image.id } />
          <img className="" src={ image.url } alt={ image.url } />
          <div className="form-check">
            <label className="form-check-label">
              <input type="hidden" name={ destroy_input_name } value="0" />
              <input className="form-check-input" type="checkbox" name={ destroy_input_name } value="1" id={ destroy_input_id } />
              Remove
            </label>
          </div>
        </div>
        <div className="col-sm-3 col-md-3">
          <div className='form-field'>
            <textarea className='form-control' defaultValue={ markdown_text } />
          </div>
        </div>
      </div>
    );
  }
}

class AddNewImagesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newImages: [],
    };
    this.addImage = this.addImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  addImage() {
    let newId = (new Date().getTime());
    let objectId = this.props.objectId;
    let objectType = this.props.objectType;
    let newImage = <NewImageComponent
                    imageId={ newId }
                    key={ newId }
                    objectType={ objectType }
                    objectId={ objectId }
                    onRemove={ () => this.removeImage(newId) }
                    imagesCount={ this.state.newImages.length + 1  } />;
    this.setState(() => {
      return {
        newImages: this.state.newImages.concat([newImage])
      }
    })
  }

  removeImage(id) {
    let imageComponent = $.grep(this.state.newImages, function(e){ return e.key == id; })[0];
    let newImages = jQuery.grep(this.state.newImages, function(comp) {
      return comp != imageComponent;
    });
    this.setState(() => {
      return {
        newImages: newImages
      }
    })
  }

  render() {
    let defaultText = this.state.newImages.length > 0 ? "Add another image" : "Add an image";
    let text = (this.props.text || defaultText);
    return (
      <div>
        { this.state.newImages }
        <a onClick={ this.addImage } className="btn btn-primary btn-xs image-add-link">
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          { " " + text }
        </a>
      </div>
    );
  }
}


class NewImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourcePreview: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  handleFile(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState(() => {
        return {
          sourcePreview: upload.target.result
        }
      })
    }

    reader.readAsDataURL(file);
  }

  removeImage() {
    this.props.onRemove(this.props.imageId);
  }

  render() {
    let id = this.props.imageId;
    let objectType = this.props.objectType;
    let objectId = this.props.objectId;

    let data_input_name = objectType+"[images_attributes]["+id+"][data]";
    let data_input_id = objectType+"_images_attributes_"+id+"_data";
    let data_input_class = objectType+"_images_attributes_data btn btn-default";
    let removeLink;

    if (this.props.imagesCount > 0) {
      removeLink = <a onClick={ this.removeImage } className="btn btn-warning btn-xs image-remove-link">Remove</a>
    } else {
      removeLink = '';
    }

    return (
      <div className='row image'>
        <div className="col-sm-6">
            <img id="image" id={ data_input_id+"_preview" }  className="image-form-preview" src={ this.state.sourcePreview } />
            <input type="file" onChange={ this.handleFile } id={ data_input_id } name={ data_input_name } className={ data_input_class } required='true' accept="image/*" />
            { removeLink }
        </div>
      </div>
    );
  }
}

$(document).on('turbolinks:load', function(){
  let el = document.getElementById('image-component');
  if (el) {
    let objectType = el.dataset.object_type;
    let objectId = el.dataset.object_id;
    let images = el.dataset.images;
    let text = el.dataset.text;
    render(<FormImagesComponent
      objectType={ objectType }
      objectId={ objectId }
      images={ images }
      text={ text } />, el);
  }
})

export default FormImagesComponent;
