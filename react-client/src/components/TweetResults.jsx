import React from 'react';
import axios from 'axios';
import Marquee from 'react-upward-marquee';
import {Redirect, Link, browserHistory} from 'react-router-dom';
import PublicTweets from './PublicTweets.jsx';
import renderif from 'render-if';

class TweetResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.redirect = this.redirect.bind(this); 
  }
  redirect() {
    this.setState({redirect: true});
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        state: { tweets: this.props.allTweets },
        pathname: '/publicTweets',
      }}/>;
    } 
   
    if (!this.props.loading) {
      return (  
          <div className="player" onClick={this.redirect}>
            <Marquee
              data={this.props.tweets}
              fontSize="15px"
              backgroundColor= "#ffe205"
            />       
          </div>     
      );
    } else {
      return null;
    }
    

    
  }
}
export default TweetResults;