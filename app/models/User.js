const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    default: ''
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: 'somepassword',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  createdOn: {
    type: Date,
    default: ""
  }

});


module.exports = mongoose.model('User', userSchema);