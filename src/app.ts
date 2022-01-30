import 'dotenv/config'

import express from 'express';

const app = express();

import scootersRoutes from './routes/scooter';


import mongoose, { ConnectOptions } from "mongoose";

mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true
} as ConnectOptions)
  .then((res) => {
    console.log(
      'Connected to Distribution API Database - Initial Connection'
    );
  })
  .catch((err) => {
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    );
  });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

/** Routes */
app.use('/api/scooter', scootersRoutes);

// const scootersRoutes = require('./routes/scooters.routes')
// app.use('/scooters', scootersRoutes);





app.listen(5000, () => console.log('Server running on port 5000'));

