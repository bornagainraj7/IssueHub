const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const issueSchema = new Schema({
    issueId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: ""
    },
    modifiedOn: {
        type: Date,
        default: ""
    }

});

module.exports = mongoose.model("Issue", issueSchema);