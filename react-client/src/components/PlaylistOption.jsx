import React from 'react';

class PlaylistOption extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <option>{this.props.playlistName}</option>
    )
  }
}

export default PlaylistOption;