import React from 'react';
import Playlist from './Playlist.jsx'
import PlaylistOption from './PlaylistOption.jsx';

class PlaylistSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaylist: false,
      selectedPlaylist: ''
    }
    this.displayPlaylist = this.displayPlaylist.bind(this);
  }

  displayPlaylist(event) {
    this.props.setCurrentPlaylist(event.target.value);
    this.setState({
      selectedPlaylist: event.target.value,
      showPlaylist: true
    });
    event.preventDetault();
  }

  render() {
    return (
      <div>
        <select 
          className="playlist-entry" 
          id="playlist-select" 
          value={this.state.selectedPlaylist} 
          onChange={this.displayPlaylist}>
          {
            this.props.playlists ? 
              Object.keys(this.props.playlists).map((playlistName, index) => {
              return <PlaylistOption 
                      key={index} 
                      playlistName={playlistName} 
                      setCurrentPlaylist={this.props.setCurrentPlaylist} 
                    />
              }) : null
          }
        </select>
      </div>
    )
  }
}

export default PlaylistSelect;
