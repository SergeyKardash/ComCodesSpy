const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  ipAddress: {
    type: String,
    required: true
  },
  deviceName: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  deviceId: {
    type: String,
    required: true
  },
  fcmToken: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema)