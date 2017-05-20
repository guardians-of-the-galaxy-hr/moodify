module.exports = {
  WATSON_TONE_API_KEY: {
    username: process.env.WATSON_TONE_USERNAME,
    password: process.env.WATSON_TONE_PASSWORD
  },
  WATSON_NLU_API_KEY: {
    username: process.env.WATSON_NLU_USERNAME,
    password: process.env.WATSON_NLU_PASSWORD
  },
  TWITTER_API_KEY: {
    consumerKey: process.env.TWITTER_API_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_API_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
    timeout: 60 * 1000,
  },
  MM_API_KEY: process.env.MM_API_KEY,
  DATABASE_URL: process.env.MONGODB_URI,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
};