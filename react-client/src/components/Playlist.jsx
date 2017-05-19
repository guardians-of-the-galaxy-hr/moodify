import React from 'react';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
  }

  updatePlaylist() {
    if (this.state.playlists.length) {
      let newPlaylists = this.playlists.slice();
      newPlaylists.push(this.props.playlist);
      this.setState({
        playlists: newPlaylists
      })  
    } else {
      let newPlaylists = [];
      newPlaylists.push(this.props.playlists);
      this.setState({
        playlists: newPlaylists
      })
    }
  }

  render() {
    this.updatePlaylist();
    return (
      <div>
        <h2>{this.props.playlist}</h2>
      </div>
    )
  }
}

export default Playlist;