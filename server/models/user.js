const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hash: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
