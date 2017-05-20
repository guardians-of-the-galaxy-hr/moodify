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

  search(artistDetails) {
    // console.log('artist and song details', value);
    this.props.search(artistDetails[1], artistDetails[0]);;
    // this.setState(
    //   { title: '', artist: '', showPrev: true
    // }); 
  }

  render() {
    return (
      <div>
        <h2>Current Playlist: {this.props.currentPlaylist}</h2>
        {this.props.playlists[this.props.currentPlaylist].map((value, index) => {
          return <li className="searchText" key={index} value={value} onClick={() => this.search(value)}>Artist: {value[0]} Title: {value[1]}</li>
        })}
      </div>
    )
  }
}

export default Playlist;