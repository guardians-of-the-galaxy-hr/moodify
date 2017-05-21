import React from 'react';
import axios from 'axios';


class Stats extends React.Component {

  render() {
    return (
      <div>
        <p>User Name: {this.props.userStatsInfo.username}</p>
        <p>Total song has listened: {this.props.userStatsInfo.totalSongsListened}</p>
        <p>List of songs that have been played: {this.props.userStatsInfo.listenedSongsList}</p>
      </div>
    );
  }
}

export default Stats;