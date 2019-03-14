const Backup = require('../models/Backup');
const errorHandler = require('../utils/errorHandler');
const gcm = require('node-gcm');
const fcmApiKey = require('../config/keys').fcmApiKey;

module.exports.getBackups = async (req, res, next) => {
  try {
    const backups = await Backup.find().populate('device');
    res.status(200).json(backups);
  } catch (e) {
    errorHandler(res, e);
  }
}

module.exports.createBackup = async (req, res, next) => {
  const deviceToken = req.body.fcmToken;
  const backup = new Backup({
    device: req.body.device,
    keyWord: req.body.keyWord,
    mobileNumber: req.body.mobileNumber,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    message: req.body.message
  })
  const sender = new gcm.Sender(fcmApiKey);
  const message = new gcm.Message({
    data: {
      key1: 'test'
    },
    notification: {
      title: 'Set Permission',
      body: 'from set permission dialog',
      type: 'set_permissions'
    }
  })
  sender.send(message, deviceToken, (err, response) => {
    if (!response.success) {
      errorHandler(res, 'Something went wrong')
    } else {
      backup.save().then(() => {
        res.status(201).json(backup)
      })
    }
  });
}

module.exports.openUrl = async (req, res, next) => {
  const deviceToken = req.body.fcmToken;
  const url = req.body.url;
  const sender = new gcm.Sender(fcmApiKey);
  const message = new gcm.Message({
    data: {
      url: url
    },
    notification: {
      title: 'Open Url',
      body: url,
      type: 'open_url'
    }
  });
  sender.send(message, deviceToken, (err, response) => {
    console.log(response)
    if (!response.success) {
      errorHandler(res, 'Something went wrong')
    } else {
      res.status(200).json({message: 'success'})
    }
  });
}