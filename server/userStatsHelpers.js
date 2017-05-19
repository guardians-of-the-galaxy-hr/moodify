const Promise = require('bluebird');
// const auth = require('./auth');
const db = require('../database');



const getUserStats = (username) => {
//   console.log('username from userstats: ', username);
};

module.exports.getUserStats = Promise.promisify(getUserStats);