require('dotenv').config({ path: './.env' });

const config = {
  env: process.env.NODE_ENV || 'development',
  database: {
    uri: process.env.DB_URL || 'mongodb://mongo:27017/appinessDB',
  },
  server:{
    port: process.env.PORT || 3000,
  }
};

export default config;