const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const keys = require('./config/keys');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const passport = require('passport');

const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/device');
const backupRoutes = require('./routes/backup');

const app = express();

mongoose.connect(keys.mongoURI)
  .then((client) => {
    console.log('..... MongoDB connected .....');
  })
  .catch((err) => {
    console.log(err);
  })

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/backup', backupRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}

module.exports = app;