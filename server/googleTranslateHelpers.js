const Promise = require('bluebird');
const googleApiKey = require('../config/index.js').GOOGLE_API_KEY;
const googleTranslate = Promise.promisifyAll(require('google-translate')(googleApiKey));
module.exports.googleTranslate = googleTranslate;

const translateToEnglish = (text, callback) => {
  text = text.replace(/\n/g, '|');
  //console.log (text);

  googleTranslate.translate(text, 'en', function(err, translation) {
    translation = translation.translatedText.replace(/\| |\|/g, '\n');
    if (err) { callback (err); }
    else { callback(err, translation); }
  });
};

module.exports.translateToEnglish = Promise.promisify(translateToEnglish);
