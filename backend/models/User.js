const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['employee', 'hr'],
    required: true
  },
  password: {  // Added password field
    type: String,
    required: true
  }
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
