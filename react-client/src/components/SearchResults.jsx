import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
    this.addToPlayList = this.addToPlayList.bind(this);
  }

  handleClick(e) {
    let index = e.target.getAttribute('value');
    console.log(this.props.results.track_list[index].track.artist_name)
    this.props.process(this.props.results.track_list[index].track);
    this.props.searchTweets(this.props.results.track_list[index].track.artist_name);
  }


  addToPlayList(artistDetails) {
    this.props.addToPlaylist(artistDetails);
  }

  render() {
    if (this.props.searchResultsLoading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else if (this.props.results.errorMessage) {
      return (
        <div className="errorMessage">{this.props.results.errorMessage}</div>
      );
    } else {
      return (
        <div className="resultsBox">
          {this.props.results.track_list.map((trackObj, i) => {
            let artistDetails = {
              trackName: trackObj.track.track_name, 
              artist: trackObj.track.artist_name
            }
            return (
              <div>
              <div className='searchText' key={i} value={i} onClick={this.handleClick} > {i + 1}. {trackObj.track.track_name} - {trackObj.track.artist_name }</div>
              <button value={artistDetails} onClick={() => this.addToPlayList(artistDetails)} key={Math.random() * i + 3462 * Math.random()} >Add to playlist</button>
              </div>
            )})
          }
        </div>
      );
    }
  }
}

export default SearchResults;
