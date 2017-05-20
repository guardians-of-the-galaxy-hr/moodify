import React from 'react';
import axios from 'axios';

class TweetResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.getTweets = this.getTweets.bind(this);
  }
  getTweets() {
    this.props.songNameAndArtist;
    axios.get('/searchTweets').then((res) => {
      if (!res.data) {
        console.log('error');
      }
      console.log(res.data);
    });
  }
  render() {
    if (!this.props.loading) {
      return (
        <div className="TweetsLoading">
          <button className="loginButton" onClick= {this.getTweets}> Tweets </button>
        </div>
      );
    } else {
      return null;
    }
    
  }
}
export default TweetResults;