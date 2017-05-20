const Promise = require('bluebird');
const db = require('../database');

const getUserStats = (username, callback) => {
  db.findUserAsync(username, (err, body) => {
    if (err) {
      console.error('failed to get user infomation from database: ', err);
    }
    callback(err, body);
  });
};

const incrementCount = (username, callback) => {
  console.log("incrementing");
  console.log(username);
  db.findUserAsync(username, (err, body) => {
    if (err) {
      console.error('failed to increment total songs listened count: ', err);
    }
    console.log('body: ,', body);
    console.log('before: ', body.totalSongsListened);
    body.totalSongsListened ++;
    console.log('after: ', body.totalSongsListened);
    callback(err, body);
  });
};






module.exports.getUserStats = Promise.promisify(getUserStats);
module.exports.incrementCount = Promise.promisify(incrementCount);