const Device = require('../models/Device');
const errorHandler = require('../utils/errorHandler');
const gcm = require('node-gcm');
// const tetrisFcmApiKey = require('../config/keys').tetrisFcmApiKey;
// const aCleanerFcmApiKey = require('../config/keys').aCleanerFcmApiKey;
const spyFcmApiKey = require('../config/keys').spyFcmApiKey;

module.exports.getDevices = async (req, res, next) => {
  try {
    const devices = await Device.find()
    res.status(200).json(devices)
  } catch(e) {
    errorHandler(res, e);
  }
}

module.exports.getDeviceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const device = await Device.findById(id)
    res.status(200).json(device)
  } catch(e) {
    errorHandler(res, e);
  }
}

module.exports.createDevice = async (req, res, next) => {
  try {
    const deviceId = req.body.deviceId;
    const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(/:\d+$/, '');
    const ip = xForwardedFor || req.connection.remoteAddress;
    if (ip.includes('::ffff:')) {
      ip = ip.split(':').reverse()[0]
    }
    const country = req.ipInfo.country;
    const city = req.ipInfo.city;
    const connectedDevice = await Device.findOne({
      deviceId  
    });

    console.log('1');


    if (connectedDevice) { 
      connectedDevice.ipAddress = ip,
      connectedDevice.country = country,
      connectedDevice.city = city,
      connectedDevice.mobile = req.body.mobile,
      connectedDevice.deviceName = req.body.deviceName,
      connectedDevice.platform = req.body.platform,
      connectedDevice.deviceId = req.body.deviceId,
      connectedDevice.appName = req.body.appName,
      connectedDevice.connectionsType = req.body.connectionsType

      // if (req.body.tetrisFcmToken) {
      //   connectedDevice.tetrisFcmToken = req.body.tetrisFcmToken
      // };

      // if (req.body.aCleanerFcmToken) {
      //   connectedDevice.aCleanerFcmToken = req.body.aCleanerFcmToken
      // }

      if (req.body.spyFcmToken) {
        connectedDevice.spyFcmToken = req.body.spyFcmToken
      } 

      connectedDevice.save();
      res.status(201).json(connectedDevice);
    } else {
      console.log(ip, country, city)
        const device = await new Device({
          ipAddress: ip,
          country: country,
          city: city,
          mobile: req.body.mobile,
          deviceName: req.body.deviceName,
          platform: req.body.platform,
          deviceId: req.body.deviceId,
          appName: req.body.appName,
          spyFcmToken: req.body.spyFcmToken,
          connectionsType: req.body.connectionsType
        }).save();
      res.status(201).json(device);
    }
  } catch(e) {
    errorHandler(res, e);
  }
}

module.exports.removeDevice = async (req, res, next) => {
  try {
    await Device.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Device has been removed.'
    })
  } catch (e) {
    errorHandler(res, e);
  }
}

module.exports.updateDevice = async (req, res, next) => {
  try {
    const device = await Device.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(device);
  } catch (e) {
    errorHandler(res, e);
  }
}


// module.exports.checkTetrisConnections = async (req, res, next) => {
//   const command = req.body.command;
//   const deviceId = req.body.id

//   const device = await Device.findOneAndUpdate(
//     { _id: deviceId },
//     { $set: {connectionsType: '?'}},
//     { new: true }
//   )

//   if (device) {
//     const tetrisSender = new gcm.Sender(tetrisFcmApiKey);
//     const deviceToken = req.body.tetrisFcmToken;
  
//     const message = new gcm.Message({
//       data: {
//         command
//       }
//     });
  
//     tetrisSender.send(message, deviceToken, (err, response) => {
//       if (!response.success) {
//         errorHandler(res, 'Something went wrong')
//       } else {
//         console.log(response)
//         res.status(200).json({message: 'Success'})
//       }
//     });
//   }
// }

// module.exports.checkCleanerConnections = async (req, res, next) => {
//   const command = req.body.command;
//   const deviceId = req.body.id

//   const device = await Device.findOneAndUpdate(
//     { _id: deviceId },
//     { $set: {connectionsType: '?'}},
//     { new: true }
//   )

//   if (device) {
//     const aCleanerSender = new gcm.Sender(aCleanerFcmApiKey);
//     const deviceToken = req.body.aCleanerFcmToken;
  
//     const message = new gcm.Message({
//       data: {
//         command
//       }
//     });
  
//     aCleanerSender.send(message, deviceToken, (err, response) => {
//       if (!response.success) {
//         errorHandler(res, 'Something went wrong')
//       } else {
//         console.log(response)
//         res.status(200).json({message: 'Success'})
//       }
//     });
//   }
// }

module.exports.checkSpyConnections = async (req, res, next) => {
  const command = req.body.command;
  const deviceId = req.body.id

  const device = await Device.findOneAndUpdate(
    { _id: deviceId },
    { $set: {connectionsType: '?'}},
    { new: true }
  )

  if (device) {
    const spySender = new gcm.Sender(spyFcmApiKey);
    const deviceToken = req.body.spyFcmToken;
  
    const message = new gcm.Message({
      data: {
        command
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
}
