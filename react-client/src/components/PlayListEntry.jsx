import React from 'react';
import PlaylistSelect from './PlaylistSelect.jsx';

class PlaylistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      playlist: [],
      entry: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  handleChange(event) {
    this.setState({
      entry: event.target.value
    });
  }

  createPlaylist(event) {
    let playlist = this.state.playlist;
    let entry = this.state.entry;
    if (entry === '') {
      alert('Please enter a playlist');
    } else {
      let newPlaylist = playlist.slice();
      newPlaylist.push(entry);
      this.setState({
        playlist: newPlaylist
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <PlaylistSelect className="playlist-entry" playlist={this.state.playlist} />
        <form className="playlist-entry" onSubmit={this.createPlaylist}>
          <input type="text" placeholder="create playlist" className="textbox" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" className="submitbutton" value="Submit"/>
        </form>
      </div>
    );
  }
}



export default PlaylistEntry;