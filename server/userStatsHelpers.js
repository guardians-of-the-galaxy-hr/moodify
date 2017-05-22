const Promise = require('bluebird');
const db = require('../database');

const Stream = require('stream');
const Speaker = require('speaker');
const config = require('../config/index.js');

const AWS = require('aws-sdk');
const AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY;

const Polly = new AWS.Polly({
    // signatureVersion: 'v4',
  region: 'us-east-1'
});

const speaker = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 16000
});

var data ={
  from: 'Shawn Feng <shawnsfeng@gmail.com>',
  to: 'mahima.srikanta@gmail.com',
  subject: 'testing mailgun api',
  text: 'manually send email using mail gun service'
};

const getUserStats = (username, callback) => {
  db.findUserAsync(username, (err, body) => {
    if (err) { console.error('failed to get user infomation from database: ', err); }
    callback(err, body);
  });
};

const incrementCount = (username, callback) => {
  db.findUserAsync(username, (err, body) => {
    if (err) { console.error('failed to increment total songs listened count: ', err); }
    body.totalSongsListened ++;
    body.save();
    callback(err, body);
  });
};


const readStats = (text) => {
  var params = {
    OutputFormat: 'pcm',
    SampleRate: '16000',
    Text: 'I used to rule the world Seas would rise when I gave the word Now in the morning I sleep alone Sweep the streets I used to own I used to roll the dice',
    TextType: 'text',
    VoiceId: 'Salli'
  };

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log("error: ", err);
      console.log(err.code);
    } else if (data) {
      console.log("got through!");
      if (data.AudioStream instanceof Buffer) {
        // Initiate the source
        var bufferStream = new Stream.PassThrough();
        // convert AudioStream into a readable stream
        bufferStream.end(data.AudioStream);
        // Pipe into Player
        // console.log(data.AudioStream);
        bufferStream.pipe(speaker);
      }
    }
    // res.send('finish play audio');
  });
};

module.exports.readStats = Promise.promisify(readStats);
module.exports.getUserStats = Promise.promisify(getUserStats);
module.exports.incrementCount = Promise.promisify(incrementCount);