import React, { Component ,createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

class CropperInput extends Component  {
  cropper = createRef()
  cropImage = () => {
    console.log(this.props)
    const {setImages} = this.props
    
    if(typeof this.cropper.current.getCroppedCanvas() === 'undefined') {
      return
    }

    this.cropper.current.getCroppedCanvas().toBlob(blob => {
      setImages(blob)
    }, 'image/jpeg')
  }
  render () {
    const {imagePreview}  = this.props
    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{ height: 200, width: "100%" }}
        preview='.img-preview'
        // Cropper.js options
        aspectRatio={16 / 9}
        viewMode={1}
        dragMode='move'
        guides={false}
        scalable={true}
        crop={this.cropImage}
        cropBoxResizable={true}
        cropBoxMovable={true}
      />
    )
  }
  
}

export default CropperInput