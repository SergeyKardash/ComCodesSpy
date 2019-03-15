const Device = require('../models/Device');
const errorHandler = require('../utils/errorHandler');

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
    console.log(req.connection.remoteAddress)
    const deviceId = req.body.deviceId;
    const ipAdress = req.connection.remoteAddress;
    ipAdress.replace(/^.*:/, '')
    const connectedDevice = await Device.findOne({
      deviceId  
    });
    if (connectedDevice) {
      res.status(409).json({
        message: "Device already exist."
      })
    } else {
      const device = await new Device({
        ipAddress: ipAdress,
        deviceName: req.body.deviceName,
        platform: req.body.platform,
        deviceId: req.body.deviceId,
        fcmToken: req.body.fcmToken
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
