const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let watcherSchema = new Schema({
    watcherId: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    issueId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: String
    },
    userName: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: ''
    }
}); 

module.exports = mongoose.model("Watcher", watcherSchema);