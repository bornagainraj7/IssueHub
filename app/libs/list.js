const mongoose = require('mongoose');

const IssueModel = require('./../models/Issue');
const AssignModel = require('./../models/Assign');
const WatchModel = require('./../models/Watcher');

const check = require('./checkLib');
const logger = require('./loggerLib');

let getAllUsers = (issue, cb) => {
    let issueId = issue;
    let allUsers = [];
    let allUniqueUsers = [];

    let getCreator = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ issueId: issueId }).select('creatorId -_id').lean()
            .exec((err, result) => {
                if (err) {
                    logger.error(`${err}`, "List Library: getCreator()", "high");
                    reject();
                } else if (check.isEmpty(result)) {
                    logger.error(`Couldn't find any issue with the given issueId`, "List Library: getAllUsersOnIssue(): getCreator()", "med");
                    reject();
                } else {
                    console.log("getCreator: ");
                    allUsers.push(result.creatorId);
                    resolve();
                }
            });
        })
    }


    let getAssignees = () => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ issueId: issueId }).select('assignedToId -_id').lean()
            .exec((err, result) => {
                if (err) {
                    logger.error(`${err}`, "List Library: getAssignees()", "high");
                    resolve();
                } else if (check.isEmpty(result)) {
                    logger.error(`Couldn't find any assignee on the issue`, "List Library: getAllUsersOnIssue(): getAssignees()", "med");
                    resolve();
                } else {
                    console.log("getAssignees: ");
                    console.log(result);
                    for (let x of result) {
                        allUsers.push(x.assignedToId);
                    }
                    resolve();
                }
            });
        })
    }


    let getWatchers = () => {
        return new Promise((resolve, reject) => {
            WatchModel.find({ issueId: issueId }).select('userId -_id').lean()
            .exec((err, result) => {
                if (err) {
                    logger.error(`${err}`, "List Library: getWatchers()", "high");
                    reject();
                } else if (check.isEmpty(result)) {
                    logger.error(`Couldn't find any watcher on the issue`, "List Library: getAllUsersOnIssue(): getWatchers()", "med");
                    reject();
                } else {
                    console.log("getWatchers: ");
                    console.log(result);
                    for (let x of result) {
                        allUsers.push(x.userId);
                    }
                    resolve();
                }
            });
        })
    }

    getCreator()
    .then(getAssignees)
    .then(getWatchers)
    .then((resolve) => {
        allUniqueUsers = [...new Set(allUsers)]
        cb(null, allUniqueUsers);
    }).catch((err) => {
        allUniqueUsers = [...new Set(allUsers)]
        cb(allUniqueUsers, null);
    })


}
    


module.exports = {
    getAllUsers: getAllUsers
}
