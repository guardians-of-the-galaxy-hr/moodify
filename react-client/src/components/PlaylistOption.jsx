import React from 'react';

class PlaylistOption extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <option>{this.props.playlist}</option>
    )
  }
}

export default PlaylistOption;