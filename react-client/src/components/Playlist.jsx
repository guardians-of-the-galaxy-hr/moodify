import React from 'react';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
  }

  search(artistInfo) {
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

            onClick={() => {
              this.props.process(value[2][value[3]].track);
            }}
          >
          Artist: {value[0]}
          Title: {value[1]}
          </li>
        })}
      </div>
    )
  }
}

export default Playlist;