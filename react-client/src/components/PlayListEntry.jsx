import React from 'react';
import PlaylistSelect from './PlaylistSelect.jsx';

class PlaylistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],
      entry: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      entry: event.target.value
    });
  }

  createPlaylist(event) {
    this.props.createNewPlaylists(this.state.entry)
    this.setState({
      entry: event.target.value
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="playlist-entry" onSubmit={this.createPlaylist}>
          <input 
            type="text" 
            placeholder="create playlist" 
            className="textbox" 
            value={this.state.value} 
            onChange={this.handleChange} 
          />
          <input 
            type="submit" 
            className="submitbutton" 
            value="Submit"
          />
        </form>
        <PlaylistSelect 
          search={this.props.search} 
          currentSongNameAndArtist={this.props.currentSongNameAndArtist} 
          playlists={this.props.playlists} 
          setCurrentPlaylist={this.props.setCurrentPlaylist} 
          currentPlaylist={this.props.currentPlaylist} 
          process={this.props.process}
        />
      </div>
    );
  }
}

export default PlaylistEntry;
