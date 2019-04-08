const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({

    commentId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    issueId: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: ''
    }
});


module.exports = mongoose.model('Comment', commentSchema);