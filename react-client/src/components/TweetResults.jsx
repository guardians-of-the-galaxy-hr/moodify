import React from 'react';
import axios from 'axios';

class TweetResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
    this.getTweets = this.getTweets.bind(this);
  }
  getTweets() {
    axios.get('/searchTweets', {
      params: {
        ArtistHashTag: this.props.songNameAndArtist[0]
      }
    })
    .then((res) => {
      if (!res.data) {
        console.log('error');
      }
      console.log(res.data.statuses);
      this.setState({tweets: res.data.statuses});
    });
  }
  render() {
    if (!this.props.loading) {
      return (
        <div className="TweetsLoading">
          <button className="loginButton" onClick= {this.getTweets}> Tweets </button>
          <div>
 
              {this.state.tweets.map((tweet, index) => {
                return <div key={index}>{tweet.text}</div>;
              })}

          </div>
        </div>
      );
    } else {
      return null;
    }
    
  }
}
export default TweetResults;