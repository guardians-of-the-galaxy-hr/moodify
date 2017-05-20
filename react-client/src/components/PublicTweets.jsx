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
      tweetData: {
        id: 'XXX',
        user: {
          name: 'XXX',
          screen_name: 'XXX',
          profile_image_url: 'XXX'
        },
        text: 'XXX',
        created_at: 'XXX',
        favorite_count: 'XXX',
        retweet_count: 'XXX',
        entities: {
          media: [],
          urls: [],
          user_mentions: [],
          hashtags: [],
          symbols: []
        } 
      }
    };
  } 
  componentDidMount() {
    axios.get('/allTweets')
    .then((res) => {
      if (!res.data) {
        console.log('error');
      }
      this.setState({allTweets: res.data.statuses});
    });
    
    
  }

  
  render() {
    console.log(this.props.tweets);
    return (
      <div>
        <Header />
          <h1> Hello from PublicTweets Page</h1>
      </div>
    );
  }

}
export default PublicTweets;