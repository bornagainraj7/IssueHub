const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const time = require('./../libs/timeLib');

const Auth = new Schema({
    userId: {
        type: String,
        required: true
    },
    authToken: {
        type: String,
        required: true
    },
    tokenSecret: {
        type: String,
        required: true,
        default: ''
    },
    tokenGenerationTime: {
        type: Date,
        default: time.now(),
        required: true
    }
});

module.exports = mongoose.model('Auth', Auth); 