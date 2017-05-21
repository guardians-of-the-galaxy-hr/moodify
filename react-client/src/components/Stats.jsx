import React from 'react';
import axios from 'axios';


class Stats extends React.Component {

  render() {
    return (
      <div>
        <p>Logged in as: <span className="stats-span">{this.props.userStatsInfo.username}</span></p>
        <p>Total songs listened: <span className="stats-span">{this.props.userStatsInfo.totalSongsListened}</span></p>
      </div>
    );
  }
}

export default Stats;
// <p>List of songs that have been played: <span className="stats-span">{this.props.userStatsInfo.listenedSongsList}</span></p>