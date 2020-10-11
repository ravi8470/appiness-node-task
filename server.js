import "core-js";
import "regenerator-runtime/runtime";
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';

import config from './config/config.vars';
import DBConnection from "./utils/db/db.conn";
import { seedRoles } from "./utils/seeders/roles.seeders";

const api = express();

api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());


api.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json('Internal Server Error!');
});

api.listen(config.server.port, async err => {
  if (err) {
    console.log('Error: ', err);
    process.exit(1);
  }

  try {
    await DBConnection();
    console.log('Connected to DB Successfully');

    //perform data seeding for admin role
    await seedRoles();

    fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
      require('./routes/' + file)(api);
    });
  } catch (err) {
    console.log('Error', err);
    process.exit(1);
  }

  console.log(
    `API is now running on port ${config.server.port} in ${config.env} mode`
  );
});

module.exports = api;