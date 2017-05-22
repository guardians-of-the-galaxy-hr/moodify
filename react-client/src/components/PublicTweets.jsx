import React from 'react';
import Header from './Header.jsx';
import axios from 'axios';
import Tweet from 'react-tweet';
import {Redirect, Link} from 'react-router-dom';
import PublicTweetMood from './PublicTweetMood.jsx';


class PublicTweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTweets: [],
      tweetAnalyses: [],
      barChartData: {
        'anger': 0,
        'disgust': 0,
        'fear': 0,
        'joy': 0,
        'sadness': 0
      },
      count: 0
    };
  } 
  componentDidMount() {
    axios.get('/allTweets')
    .then((res) => {
      if (!res.data) {
        console.log('error');
      }
      res.data.tweetAnalyses.map((item) => {
        if (item !== null) {
          this.state.count++;
          this.state.barChartData.anger += item.anger;
          this.state.barChartData.disgust += item.disgust;
          this.state.barChartData.fear += item.fear;
          this.state.barChartData.joy += item.joy;
          this.state.barChartData.sadness += item.sadness;
        }
      });
      Object.keys(this.state.barChartData).map((key) => {
        this.state.barChartData[key] = this.state.barChartData[key] / this.state.count;
      });
      this.setState({
        allTweets: res.data.tweets.statuses,
        tweetAnalyses: res.data.tweetAnalyses,
      });
    });       
  } 

  render() {
    return (
      <div>
        <Header />
        <div className = "moodClass tweetClass">
          {this.state.allTweets.map((tweet, i) => {                
            var formattedObject = {
              'id': tweet.id,
              'user': {
                'name': tweet.user.name,
                'screen_name': tweet.user.screen_name,
                'profile_image_url': tweet.user.profile_image_url,
              },
              'text': tweet.text,
              'created_at': tweet.created_at,
              'favorite_count': tweet.favorite_count,
              'retweet_count': tweet.retweet_count,
              'entities': {
                'urls': tweet.entities.urls,
                'user_mentions': tweet.entities.user_mentions,
                'hashtags': tweet.entities.hashtags,
                'symbols': tweet.entities.symbols,
              }
            };
            return <Tweet data={formattedObject} key={i} />;
          })}
          <div className="moodClass">
           <PublicTweetMood tweetAnalyses={this.state.barChartData} />
          </div>
        </div>         
      </div>        
    );     
  }
   


}
export default PublicTweets;