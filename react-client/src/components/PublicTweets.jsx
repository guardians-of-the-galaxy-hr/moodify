import React from 'react';
import Header from './Header.jsx';
import axios from 'axios';
import Tweet from 'react-tweet';
import {Redirect, Link} from 'react-router-dom';


class PublicTweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTweets: []
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