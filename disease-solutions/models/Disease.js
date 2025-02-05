const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  solution: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Disease', diseaseSchema);