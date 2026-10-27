const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: 'user'
    }
  },
  {
    versionKey: false,
    collection: 'Users'
  }
);

module.exports = mongoose.model('User', userSchema);
