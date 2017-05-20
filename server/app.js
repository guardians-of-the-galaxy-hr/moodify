// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
// const path = require('path');
const cors = require('cors');
const Promise = require('bluebird');

// other module exports
const auth = require('./auth.js');
const mmHelpers = require('./musixMatchHelpers.js');
const spotifyHelpers = require('./spotifyHelpers.js');
const watsonHelpers = require('./watsonHelpers.js');
const googleTranslateHelpers = require('./googleTranslateHelpers.js');
const userStatsHelpers = require('./userStatsHelpers');
const db = require('../database');

// initialize and set up app
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: "ssshhh", resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));

// routes
let sess = {};

// other variables
var usernameStats = '';

// request handlers
app.post('/signup', auth.createUser, (req, res) => {
  sess = req.session;
  sess.username = req.body.username;
  usernameStats = req.body.username;
  res.send({statusCode: 200});
});

app.post('/login', auth.verifyUser, (req, res) => {
  sess = req.session;
  sess.username = req.body.username;
  usernameStats = req.body.username;
  res.send({statusCode: 200});
});

app.get('/check', (req, res) => {
  if (req.session.username) {
    res.send({statusCode: 200});
  } else {
    res.send({statusCode: 404});
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('logged out!');
});

app.post('/search', (req, res) => {
  return mmHelpers.searchByTitleAndArtist(req.body.title, req.body.artist)
  .then(data => {
    if (data.track_list.length === 0) { res.send({errorMessage: 'No Search Results'}); }
    res.send(data);
  })
  .catch(error => { res.send(error); });
});

app.post('/fetchLyricsByTrackId', (req, res) => {
  const trackId = req.body.trackId;
  return mmHelpers.getLyricsByTrackId(trackId)
  .then(lyrics => {
    res.send(lyrics);
  })
  .catch(error => { res.send(error); });
});

app.post('/process', (req, res) => {
  let input = req.body;
  const songNameAndArtist = [input.artist_name, input.track_name];
  console.log("Song name and artist", songNameAndArtist)
  let watsonData = {};
  let lyricsLang;
  let lyricsEnglish;
  let artistEnglish;
  let titleEnglish;

  return mmHelpers.getLyricsByTrackId(input.track_id)
  .then(data => {
    const lyrics = data.lyrics.lyrics_body;

    input.lyrics = lyrics.slice(0, (lyrics.indexOf('*******')));
    return;
  })
  .then (() => {
    return googleTranslateHelpers.googleTranslate.detectLanguageAsync(input.lyrics);
  })
  .then ((detection) => {
    lyricsLang = detection.language;
    console.log ('language', lyricsLang);
    if (lyricsLang !== 'en') {
      return googleTranslateHelpers.translateToEnglish(detection.originalText);
    }
    return input.lyrics;
  })
  .then((lyrics) => {
    lyricsEnglish = lyrics;
    if (lyricsLang !== 'en') {
      return googleTranslateHelpers.translateToEnglish(songNameAndArtist[0]);
    }
    return;
  })
  .then((artist) => {
    if (lyricsLang !== 'en') {
      artistEnglish = artist;
      return googleTranslateHelpers.translateToEnglish(songNameAndArtist[1]);
    }
    return;
  })
  .then((title) => {
    if (lyricsLang !== 'en') {
      titleEnglish = title;
    }
    return watsonHelpers.queryWatsonToneHelper(lyricsEnglish);
  })
  .then(data => {
    watsonData = {
      track_id: input.track_id,
      anger: data.anger,
      disgust: data.disgust,
      fear: data.fear,
      joy: data.joy,
      sadness: data.sadness,
      analytical: data.analytical,
      confident: data.confident,
      tentative: data.tentative,
      openness: data.openness,
      conscientiousness: data.conscientiousness,
      extraversion: data.extraversion,
      agreeableness: data.agreeableness,
      emotionalrange: data.emotionalrange
    };
    const newEntry = new db.Watson(watsonData);
    newEntry.save(err => {
      if (err) { console.log('SAVE WATSON ERROR'); }
    });
  })
  .then(() => {
    if (req.session.username) {
      return db.User.where({username: req.session.username});
    }
  })
  .then((result) => {
    if (req.session.username) {
      function unique(value, index, self) {
        return self.indexOf(value) === index;
      }
      result[0].songs.push(input.track_id);
      var songs = result[0].songs.filter(unique);

      if (req.session.username) {
        return db.User.where({username: req.session.username}).update({songs: songs});
      }
    }
  })
  .then(() => {
    return spotifyHelpers.getSongByTitleAndArtist(input.track_name, input.artist_name);
  })
  .then((spotifyData) => {
    input.spotify_uri = spotifyData;

    const songEntry = new db.Song(input);
    songEntry.save(err => {
      if (err) { console.log('SAVE SONG ERROR'); }
    });
  })
  .then(() => {
    res.json([songNameAndArtist, input.lyrics, watsonData, input.spotify_uri, lyricsLang, lyricsEnglish, artistEnglish, titleEnglish]);
  })
  .catch((error) => {
    console.log('/PROCESS ERROR: ', error);
    res.send(error);
  });
});

app.get('/pastSearches', (req, res) => {
  const username = req.session.username;
  var songArray = [];

  db.findUserAsync(username)
  .then((user)=> {
    var songs = user.songs;
    return Promise.map(songs, function(songId) {
      return db.findSongAsync(songId)
      .then(data => {
        songArray.push({
          track_id: songId,
          track_name: data.track_name,
          artist_name: data.artist_name
        });
      })
      .catch((err) => {
        console.log (err);
      });
    });
  })
  .then(() => {
    if (songArray.length === 0) { res.send({errorMessage: 'No Past Searches'}); }
    else {
      res.send(songArray);
    }
  })
  .catch((err) => {
    res.send({errorMessage: err});
  });
});

app.post('/loadPastSearchResults', (req, res) => {
  return new Promise((resolve, reject) => {
    db.Song
    .find({ track_id: req.body.track_id })
    .exec((err, data) => {
      resolve(data[0]);
    });
  })
  .then((songData) => {
    let output = [];
    output.push(songData);
    db.Watson
    .find({ track_id: req.body.track_id })
    .exec((err, watsonData) => {
      output.push(watsonData[0]);
      res.send(output);
    });
  })
  .catch(err => { res.send(err); });
});

app.get('/userStats', (req, res) => {
  userStatsHelpers.getUserStats(usernameStats, (err, data) => {
    if (err) { console.error('error in /userStats: ', err); }
    res.send(data);
  });
});

app.post('/incrementCount', (req, res) => {
  userStatsHelpers.incrementCount(usernameStats, (err) => {
    if (err) { console.error('error in /incrementCount: ', err); }
    res.send();
  });
});

module.exports = app;
