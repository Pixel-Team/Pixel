const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  _id: String,
  coins: {
    type: Number,
    default: 0
  },
  daily: {
    day: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 0
    },
  },
  inventory: {type: []}
})

const ProfileModel = mongoose.model('profile', ProfileSchema)
exports.profile = ProfileModel;