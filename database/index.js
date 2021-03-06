const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.Promise = require('bluebird');
const Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/test');
const config = require('../config/index.js');
const DATABASE_URL = config.DATABASE_URL;

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection fail ._____.');
});

db.once('open', () => {
  console.log('mongoose connection success! b(^.~)z');
});

let songSchema = mongoose.Schema({
  track_id: {type: Number, unique: true},
  track_name: String,
  artist_name: String,
  album_coverart_100x100: String,
  album_coverart_350x350: String,
  album_coverart_500x500: String,
  album_coverart_800x800: String,
  lyrics: String,
  spotify_uri: String
});
songSchema.plugin(beautifyUnique);
const Song = mongoose.model('Song', songSchema);

let watsonSchema = mongoose.Schema({

  track_id: { type: Number, unique: true },

	// Emotion Tone
  anger: Number,
  disgust: Number,
  fear: Number,
  joy: Number,
  sadness: Number,

  // Language Tone
  analytical: Number,
  confident: Number,
  tentative: Number,

  // Social Tone
  openness: Number,
  conscientiousness: Number,
  extraversion: Number,
  agreeableness: Number,
  emotionalrange: Number

});
watsonSchema.plugin(beautifyUnique);
const Watson = mongoose.model('Watson', watsonSchema);

let userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  songs: [Number],
  listenedSongsList: [Number],
  totalSongsListened: Number
});
userSchema.plugin(beautifyUnique);
const User = mongoose.model('User', userSchema);

module.exports.Song = Song;
module.exports.Watson = Watson;
module.exports.User = User;

var findUser = function (username, callback) {
  User.where({username: username}).findOne((err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, data);
    }
  });
};

module.exports.findUser = findUser;
module.exports.findUserAsync = Promise.promisify(findUser);

var findSong = function (song_id, callback) {
  Song.where({track_id: song_id}).findOne((err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, data);
    }
  });
};

module.exports.findSong = findSong;
module.exports.findSongAsync = Promise.promisify(findSong);
