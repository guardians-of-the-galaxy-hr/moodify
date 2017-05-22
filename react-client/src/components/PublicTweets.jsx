import React from 'react';
import Header from './Header.jsx';
import axios from 'axios';
import Tweet from 'react-tweet';
import {Redirect, Link} from 'react-router-dom';


class PublicTweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTweets: [],
      tweetAnalyses: [],
    };
  } 
  componentDidMount() {
    axios.get('/allTweets')
    .then((res) => {
      if (!res.data) {
        console.log('error');
      }
      console.log(res.data.tweets);
      this.setState({
        allTweets: res.data.tweets.statuses,
        tweetAnalyses: res.data.tweetAnalyses
      });
    });       
  } 

  render() {
    console.log(this.props.tweets);
    return (
      <div>
        <Header />
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
         </div>         
    );     
  }
   


}
export default PublicTweets;