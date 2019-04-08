const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let assignSchema = new Schema({
    assignId: {
        type: String,
        required: true,
        index: true,
        unique: true
    }, 
    issueId: {
        type: String,
        required: true
    },
    assignedById: {
        type: String,
        required: true
    },
    assignedByName: {
        type: String,
        required: true
    },
    assignedToId: {
        type: String,
        required: true
    },
    assignedToName: {
        type: String,
        required: true
    },
    assignedOn: {
        type: Date,
        default: ''
    }
});

module.exports = mongoose.model("Assign", assignSchema);