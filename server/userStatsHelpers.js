const Promise = require('bluebird');
const db = require('../database');

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

module.exports.getUserStats = Promise.promisify(getUserStats);
module.exports.incrementCount = Promise.promisify(incrementCount);