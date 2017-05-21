import React from 'react';
import renderif from 'render-if';
import Player from './Player.jsx';
import axios from 'axios';

class Lyrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      artist: '',
      langOriginal: true
    };
    this.toggleLang = this.toggleLang.bind(this);
    this.increamentSongsListened = this.increamentSongsListened.bind(this);
  }

  toggleLang () {
    console.log ('toggling');
    this.setState({langOriginal: !this.state.langOriginal});
  }

  increamentSongsListened () {
    axios.post('/incrementCount')
    .then(response => {
      console.log('incremented listened songs count');
    })
    .catch(error => {
      console.error('failed to increment listened songs count ', error);
    });
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loading">
          <img alt="loading" src="./img/triangle.svg"/>
        </div>
      );
    } else {
      return (
        <div className="lyrics" >
          {renderif(this.props.lyricsLang !== 'en')(
            <button className="submitbutton floatRight" onClick={this.toggleLang}>
              {this.state.langOriginal ? 'en' : this.props.lyricsLang}
            </button>
          )}
          {this.state.langOriginal
            ? <h6 onClick={this.increamentSongsListened.bind(this)}>{this.props.songNameAndArtist[0] + ' - ' + this.props.songNameAndArtist[1]}</h6>
            : <h6>{this.props.artistEnglish + ' - ' + this.props.titleEnglish}</h6>
          }
          {this.props.showPlayer
            ? <Player spotifyURI={this.props.spotifyURI} loading={this.props.loading}/>
            : null }
          {this.state.langOriginal
            ? <pre>{this.props.lyrics}</pre>
            : <pre>{this.props.lyricsEnglish}</pre>
          }
        </div>
      );
    }
  }
}


export default Lyrics;

