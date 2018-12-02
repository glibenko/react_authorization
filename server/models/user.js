const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hash: {
    type: String,
    trim: true,
  },
  facebookId: {
    type: String,
    trim: true,
  },
  facebookToken: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
