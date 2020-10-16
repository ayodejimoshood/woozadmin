import React from "react";
import ImageUploader from "react-images-upload";

class UploadVerticalIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
    });
  }

  render() {
    return (
      <ImageUploader
        withIcon={true}
        buttonText="vertical icon"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}

export default UploadVerticalIcons;