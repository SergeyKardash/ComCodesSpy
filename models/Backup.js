const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backupSchema = new Schema({
  keyWord: {
    type: String,
  },
  mobileNumber: {
    type: Number,
  },
  fromDate: {
    type: Date
  },
  toDate: {
    type: Date
  },
  message: {
    type: String,
    default: 'test'
  },
  device: {
    ref: 'Device',
    type: Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Backup', backupSchema);
