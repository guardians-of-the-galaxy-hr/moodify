import React from 'react';
import axios from 'axios';
import Marquee from 'react-upward-marquee';
class TweetResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }
  render() {
    if (!this.props.loading) {
      return (  
          <div className="player">
            <Marquee
              data={this.props.tweets}
              fontSize="15px"
              backgroundColor= "#ffe205"
              animationTime="1500"
            />
          </div>     
      );
    } else {
      return null;
    }
    
  }
}
export default TweetResults;