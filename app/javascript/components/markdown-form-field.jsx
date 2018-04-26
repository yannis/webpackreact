import React from 'react';
import {render} from 'react-dom';

class MarkdownFormField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      likesCount : 0
    };
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div>
        this is a form field
      </div>
    );
  }
}

export default MarkdownFormField;
