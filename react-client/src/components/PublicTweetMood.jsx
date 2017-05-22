import React from 'react';
import {Bar} from 'react-chartjs-2';

class PublicTweetMood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotionData: {
        labels: ['Anger', 'Joy', 'Disgust', 'fear', 'sadness'],
        datasets: [{
          label: 'Sentiment Analyses',
          data: [
            props.tweetAnalyses.anger,
            props.tweetAnalyses.joy,
            props.tweetAnalyses.disgust,
            props.tweetAnalyses.fear,
            props.tweetAnalyses.sadness
          ],
          backgroundColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderWidth: 3
        }]
      },
      emotionOptions: {
        title: {
          display: false,
          text: 'Kanye West - Famous',
          fontSize: 24
        },
      },

    };   
  }
  componentWillReceiveProps(props) {
    this.setState({
      emotionData: {
        labels: ['Anger', 'Joy', 'Disgust', 'Sadness', 'Fear'],
        datasets: [{
          label: 'Sentiment Analyses',
          data: [
            props.tweetAnalyses.anger,
            props.tweetAnalyses.joy,
            props.tweetAnalyses.disgust,
            props.tweetAnalyses.fear,
            props.tweetAnalyses.sadness
          ],
          backgroundColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderColor: [
            'rgba(252, 61, 57, 1)',
            'rgba(254, 203, 46, 1)',
            'rgba(83, 215, 105, 1)',
            'rgba(20, 126, 251, 1)',
            'rgba(193, 53, 132, 1)',
          ],
          borderWidth: 3
        }]
      },
      emotionOptions: {
        title: {
          display: false,
          text: 'hello',
          fontSize: 24
        },
      },
    });
  }
  render() {
    console.log(this.state.emotionData.datasets[0].data);
    return (
      <div className="maingraph">
        <h2>Emotion</h2>
        <Bar data={this.state.emotionData} options={this.state.emotionOptions} width={500}/>
      </div>
    );       
  }


}

export default PublicTweetMood;