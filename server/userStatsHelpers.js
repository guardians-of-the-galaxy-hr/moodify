const Promise = require('bluebird');
const db = require('../database');
const Stream = require('stream');
const Speaker = require('audio-speaker/stream');
const config = require('../config/index.js');

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
});

var Polly = new AWS.Polly({
  // signatureVersion: 'v4',
  region: 'us-east-1'
});

const getUserStats = (username, callback) => {
  db.findUserAsync(username, (err, body) => {
    if (err) { console.error('failed to get user infomation from database: ', err); }
    callback(err, body);
  });
};

const incrementCount = (username, songNameAndArtist, callback) => {
  db.findUserAsync(username, (err, body) => {
    if (err) { console.error('failed to increment total songs listened count: ', err); }
    body.totalSongsListened ++;
    body.listenedSongsList[songNameAndArtist] === undefined ? 1 : body.listenedSongList[songNameAndArtist]++;
    body.save();
    callback(err, body);
  });
};

const readStats = (text) => {

  var params = {
    OutputFormat: 'pcm',
    SampleRate: '16000',
    Text: text,
    TextType: 'text',
    VoiceId: 'Emma'
  };

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err.code);
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        // Initiate the source
        var bufferStream = new Stream.PassThrough();
        // convert AudioStream into a readable stream
        bufferStream.end(data.AudioStream);
        // Pipe into Player
        bufferStream.pipe(
          Speaker({
            //PCM input format defaults, optional.
            channels: 1,
            bitDepth: 16,
            sampleRate: 16000
            //byteOrder: 'LE',
            //signed: true,
            //float: false,
            //interleaved: true,
          })
        );
      }
    }
  });
};

module.exports.readStats = Promise.promisify(readStats);
module.exports.getUserStats = Promise.promisify(getUserStats);
module.exports.incrementCount = Promise.promisify(incrementCount);

