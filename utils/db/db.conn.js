import mongoose from 'mongoose';

import config from '../../config/config.vars';

const DBConnection = () =>  mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


export default DBConnection;