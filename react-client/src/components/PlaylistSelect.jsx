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
    event.preventDetault();
    // this.setState({
    //   selectedPlaylist: event.target.value,
    //   showPlaylist: true
    // });
  }

  render() {
    return (
      <div>
        <select className="playlist-entry" id="playlist-select" value={this.state.selectedPlaylist} onChange={this.displayPlaylist}>
          {
            this.props.playlists ? 
              this.props.playlistList.map((playlist, index) => {
              return <PlaylistOption key={index} playlist={playlist} />
              }) : null
          }
        </select>
        {this.state.showPlaylist ? <Playlist className="playlist" playlist={this.state.selectedPlaylist} /> : null}
      </div>
    )
  }
}

export default PlaylistSelect;
