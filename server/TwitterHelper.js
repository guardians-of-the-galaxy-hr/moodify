
const Promise = require('bluebird');
const Twit = require('twit');
const config = require('../config/index.js');
const TwitterKeys = config.TWITTER_API_KEY;


//Configure Twit Module
var twitter = new Twit({
  consumer_key: TwitterKeys.consumerKey,
  consumer_secret: TwitterKeys.consumerSecret,
  access_token: TwitterKeys.accessToken,
  access_token_secret: TwitterKeys.accessTokenSecret,
  timeout_ms: TwitterKeys.timeout
});

Promise.promisifyAll(twitter);

var queryTwitter = (artistHashTag, callback) => {
  twitter.getAsync('search/tweets', { q: `#${artistHashTag} since:2016-03-11`, count: 20 })
  .then((data) => {
    //console.log('from twitterHelper data:', data); 
    selectedSong = data;
    callback(data);   
  })
  .catch((err) => {
    console.log('from twitterHelper err:', err); 
    callback(err);
  });
};
   
 

module.exports.queryTwitterHelper = queryTwitter;

