import React from 'react';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
    console.log(props.currentSongNameAndArtist);
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

  search(artistInfo) {
    console.log('artist and song details', value);
    this.props.process(this.props.results.track_list[index].track);
  }

  render() {
    return (
      <div>
        <h2>Current Playlist: {this.props.currentPlaylist}</h2>
        {this.props.playlists[this.props.currentPlaylist].map((value, index) => {
          return <li 
            className="searchText" 
            key={index} 
            value={value} 
            onClick={() => this.props.process(value[2][value[3]].track)}>Artist: {value[0]} Title: {value[1]}</li>
        })}
      </div>
    )
  }
}

export default Playlist;