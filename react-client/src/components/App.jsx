// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
// sub components
import Lyrics from './Lyrics.jsx';
import Mood from './Mood.jsx';
import Player from './Player.jsx';
import Search from './Search.jsx';
import Header from './Header.jsx';
import Stats from './Stats.jsx';
import SearchResults from './SearchResults.jsx';
import User from './User.jsx';
import LoginSignup from './LoginSignup.jsx';
import PublicTweets from './PublicTweets.jsx';
import PastSearchResults from './PastSearchResults.jsx';
import TweetResults from './TweetResults.jsx';
import PlaylistEntry from './PlayListEntry.jsx';
import SideMenu from './SideMenu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllTweets: [],
      artistEnglish: '',
      currentLyrics: '',
      currentPlaylist: null,
      currentSongNameAndArtist: [],
      loginState: false,
      lyricsEnglish: '',
      lyricsLang: 'en',
      lyricsLoading: false,
      playlists: {},
      spotifyURI: null,
      searchResults: [],
      searchResultsUser: [],
      searchResultsLoading: false,
      spotifyLoading: false,
      showPlayer: false,
      showLyrics: false,
      showMood: false,
      showResults: false,
      showResultsUser: false,
      showStats: false,
      showPrev: false,
      showTweets: false,
      showLoginName: false,
      searchResultsLoadingUser: false,
      titleEnglish: '',
      tweets: [],
      upDown: true,
      url: window.location.href,
      upDownUser: false,
      userStatsInfo: {
        username: '',
        listenedSongsList: [],
        totalSongsListened: 0,
      },
      visible: false,
      albumArtist: '',
      watson: {}
    };

    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.getUserName = this.getUserName.bind(this);
    this.hideUsernameOnLogout = this.hideUsernameOnLogout.bind(this);
    this.createNewPlaylists = this.createNewPlaylists.bind(this);
    this.loadPastSearchResults = this.loadPastSearchResults.bind(this);
    this.getLoginState = this.getLoginState.bind(this);
    this.process = this.process.bind(this);
    this.search = this.search.bind(this);
    this.searchTweets = this.searchTweets.bind(this);
    this.showLeft = this.showLeft.bind(this);
    this.showResults = this.showResults.bind(this);
    this.showResultsUser = this.showResultsUser.bind(this);
    this.setCurrentPlaylist = this.setCurrentPlaylist.bind(this);
    this.showUserStats = this.showUserStats.bind(this);
    this.upDown = this.upDown.bind(this);
    this.upDownUser = this.upDownUser.bind(this);
    this.updateUserStats = this.updateUserStats.bind(this);
  }

  getUserName() {
    axios.get('/getUsername')
    .then(response => {
      if (this.state.loginState) {
        response.data === '' ? null : this.setState({ showLoginName: true, userStatsInfo: {username: response.data}});
      }
    })
    .catch(error => {
      console.error('failed to get user name: ', error );
    });
  }

  getLoginState(currentLoginState) {
    this.setState({
      loginState: currentLoginState
    });
  }

  search(title, artist) {
    this.setState({
      showResults: true,
      searchResultsLoading: true,
      showPrev: true,
      upDown: false
    });

    let options = {
      title: title,
      artist: artist
    };
    axios.post('/search', options).then((res) => {
      if (!res.data) {
        console.log('error');
      }
      this.setState({
        searchResults: res.data,
        searchResultsLoading: false
      });
    });
  }

  process(trackObj) {
    this.setState({
      showPlayer: true,
      spotifyLoading: true,
      lyricsLoading: true,
      showResults: false,
      showResultsUser: false,
      upDownUser: false,
      showLyrics: false,
      showMood: false,
      upDown: true,
      showTweets: true,
    });

    let input = {};
    input.track_id = trackObj.track_id;
    input.track_name = trackObj.track_name;
    input.artist_name = trackObj.artist_name;
    input.album_coverart_100x100 = trackObj.album_coverart_100x100;
    input.album_coverart_350x350 = trackObj.album_coverart_350x350;
    input.album_coverart_500x500 = trackObj.album_coverart_500x500;
    input.album_coverart_800x800 = trackObj.album_coverart_800x800;

    axios.post('/process', input).then(res => {
      let data = res.data;
      console.log('data at 0', data);
      this.setState({
        currentSongNameAndArtist: data[0],
        currentLyrics: data[1],
        watson: data[2],
        spotifyURI: data[3],
        lyricsLang: data[4],
        lyricsEnglish: data[5],
        artistEnglish: data[6],
        titleEnglish: data[7],
        spotifyLoading: false,
        lyricsLoading: false,
        showLyrics: true,
        showMood: true
      });
    }).catch(error => {
      throw error;
    });
  }

  searchTweets(trackAlbumArtist) {
    axios.get('/searchTweets', {
      params: {
        ArtistHashTag: trackAlbumArtist
      }
    })
    .then((res) => {
      if (res.data.statuses.length === 0) {
        console.log('error');
        this.state.tweets = [{content: 'Unable to get any Tweets', time: 4}];
      } else {
        this.state.albumArtist = trackAlbumArtist;
        this.state.tweets = res.data.statuses.map((tweet, index) => {
          return ({content: tweet.text, time: 4});
        });
        this.state.AllTweets = res.data;
      }
      //console.log(res.data.statuses);
    });
  }

  showResults() {
    this.setState({
      showResults: !this.state.showResults,
      showTweets: !this.state.showTweets
    });
    console.log(this.state.showTweets);
  }

  showResultsUser() {
    this.setState({
      showResultsUser: !this.state.showResultsUser
    });
  }

  upDown() {
    this.setState({
      upDown: !this.state.upDown
    });
  }

  upDownUser() {
    this.setState({
      upDownUser: !this.state.upDownUser
    });
  }

  showUserStats() {
    this.setState({
      showStats: !this.state.showStats
    });
  }

  hideUsernameOnLogout() {
    this.setState({
      showLoginName: false
    });
  }

  setCurrentPlaylist(playlist) {
    this.setState({
      currentPlaylist: playlist
    });
  }

  createNewPlaylists(playlistName) {
    if (this.state.playlists.hasOwnProperty(playlistName)) { return };
    let playlists = this.state.playlists;
    playlists[playlistName] = [];
    this.setState({
      playlists: playlists
    });
  }

  addToPlaylist(artistInfo) {
    console.log('Artist Information----', artistInfo);
    if (this.state.currentPlaylist && this.state.playlists) {
      let updatedPlaylists = this.state.playlists;
      updatedPlaylists[this.state.currentPlaylist].push([artistInfo.artist, artistInfo.trackName, artistInfo.processResults, artistInfo.index]);
      this.setState({
        playlists: updatedPlaylists
      });
    } else {
      alert('Please create a playlist first!');
    }
  }

  updateUserStats(userInfo) {
    this.setState({
      userStatsInfo: {
        username: userInfo.data.username,
        listenedSongsList: userInfo.data.listenedSongsList,
        totalSongsListened: userInfo.data.totalSongsListened
      }
    });
  }

  showLeft () {
    this.refs.left.show();
  }

  createNewPlaylists(playlistName) {
    if (this.state.playlists.hasOwnProperty(playlistName)) { return; }
    let playlists = this.state.playlists;
    playlists[playlistName] = [];
    this.setState({
      playlists: playlists
    });
  }

  addToPlaylist(artistInfo) {
    console.log('Artist Information----', artistInfo);
    if (this.state.currentPlaylist && this.state.playlists) {
      let updatedPlaylists = this.state.playlists;
      updatedPlaylists[this.state.currentPlaylist].push([artistInfo.artist, artistInfo.trackName, artistInfo.processResults, artistInfo.index]);
      this.setState({
        playlists: updatedPlaylists
      });
    } else {
      alert('Please create a playlist first!');
    }
  }

  setCurrentPlaylist(playlist) {
    this.setState({
      currentPlaylist: playlist
    });
  }

  loadPastSearchResults(trackId) {
    axios.post('/loadPastSearchResults', {track_id: trackId}).then(res => {
      let songData = res.data[0];
      let watsonData = res.data[1];
      console.log(watsonData);
      this.setState({
        currentLyrics: songData.lyrics,
        currentSongNameAndArtist: [
          songData.track_name, songData.artist_name
        ],
        watson: watsonData,
        spotifyURI: songData.spotify_uri,
        showMood: true,
        showPlayer: true,
        showLyrics: true
      });
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Header url={this.state.url}
          username={this.state.userStatsInfo.username}
          showLoginName={this.state.showLoginName}
        />
        <div className="container">
            <SideMenu
                showStats={this.state.showStats}
                userStatsInfo={this.state.userStatsInfo}
                visible={this.state.visible}
                ref="left"
                alignment="left"
              />
          <div className="col1">
            <Search
              search={this.search}
              prev={this.showResults}
              showPrev={this.state.showPrev}
              upDown={this.state.upDown}
              runUpDown={this.upDown}
            />
            {this.state.showResults
              ? <SearchResults
                  results={this.state.searchResults}
                  process={this.process}
                  searchTweets={this.searchTweets}
                  searchResultsLoading={this.state.searchResultsLoading}
                  addToPlaylist={this.addToPlaylist}
                />
              : null
            }

            {this.state.showPlayer
              ? <Lyrics
                  showPlayer={this.state.showPlayer}
                  spotifyURI={this.state.spotifyURI}
                  loading={this.state.spotifyLoading}
                  lyrics={this.state.currentLyrics}
                  loading={this.state.lyricsLoading}
                  songNameAndArtist={this.state.currentSongNameAndArtist}
                  lyricsLang={this.state.lyricsLang}
                  lyricsEnglish={this.state.lyricsEnglish}
                  artistEnglish={this.state.artistEnglish}
                  titleEnglish={this.state.titleEnglish}
                />
              : null
            }
            {this.state.showTweets
              ? <TweetResults
                  loading={this.state.spotifyLoading}
                  tweets={this.state.tweets}
                  allTweets={this.state.AllTweets}
                  albumArtist={this.state.albumArtist}
                />
              : null
            }
          </div>

          <div className="col2">
            <PlaylistEntry
              className="playlistEntry"
              addToPlaylist={this.state.addToPlaylist}
              createNewPlaylists={this.createNewPlaylists}
              setCurrentPlaylist={this.setCurrentPlaylist}
              currentPlaylist={this.state.currentPlaylist}
              playlists={this.state.playlists}
              process={this.process}
            />
            <User
              showPrev={this.state.showResultsUser}
              prev={this.showResultsUser}
              upDown={this.state.upDownUser}
              runUpDown={this.upDownUser}
              process={this.process}
              searchResultsLoading={this.state.searchResultsLoadingUser}
              loadPastSearchResults={this.loadPastSearchResults}
              showUserStats={this.showUserStats}
              process={this.process}
              updateUserStats={this.updateUserStats}
              hideUsernameOnLogout={this.hideUsernameOnLogout}
              showLeft={this.showLeft}
              getLoginState={this.getLoginState}
              getUserName={this.getUserName}
            />
                {this.state.showMood
                ? <Mood
                  watson={this.state.watson}
                  songNameAndArtist={this.state.currentSongNameAndArtist}/>
                : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
