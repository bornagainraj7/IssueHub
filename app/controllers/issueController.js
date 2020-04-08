const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("tracer").colorConsole();
const check = require("./../libs/checkLib");

const IssueModel = require("./../models/Issue");
const UserModel = require('./../models/User');
const CommentModel = require('./../models/Comment');
const WatchModel = require('./../models/Watcher');
const AssignModel = require('./../models/Assign');

const fs = require('fs');


let getAllIssue = (req, res) => {
    IssueModel.find()
    .sort({createdOn: -1}).select('-_id -__v').lean().exec((err, result) => {
        if(err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Failed to find issue details", 500, null);
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            
            logger.error("No Issue found");
            let apiResponse = response.generate(true, "No issue's found", 404, null);
            res.send(apiResponse);
        } else {
            logger.info("All Issue's successfully retrieved");
            let apiResponse = response.generate(false, "All issue's successfully retrieved", 200, result);
            res.send(apiResponse);
        }
    });
}


let getAllIssuesOnUser = (req, res) => {
    console.log("correct");
    let userId = req.user.userId;
    let allIssueIds = [];

    let getIssueIds = () => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ assignedToId: userId }).lean().select('issueId -_id')
            .exec((err, result) => {
                if (err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Server error, failed to retrieve assigned issues", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    logger.error("No Issues yet assigned to user");
                    let apiResponse = response.generate(true, "No Issues yet assigned to user", 404, null);
                    reject(apiResponse);
                } else {
                    for(x of result) {
                        allIssueIds.push(x.issueId);
                    }
                    resolve(allIssueIds);
                }
            })
        })
    } //end of getIssueIds

    let getAllIssues = (issueIds) => {
        return new Promise((resolve, reject) => {
            IssueModel.find({ issueId: issueIds }).lean().select('-_id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error(err);
                    } else if (result) {
                        resolve(result);
                    }
                })

        })
    } //end of getAllIssues


    getIssueIds(req, res)
    .then(getAllIssues)
    .then((resolve) => {
        let apiResponse = response.generate(false, "All Issue assigned to the user retrivied successfully", 200, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    })    


}


let createNewIssue = (req, res) => {
    const url = req.protocol + '://' + req.get("host");
   
    let newIssue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        creatorId: req.user.userId,
        creatorName: req.user.fullName,
        status: req.body.status,
        createdOn: time.now()
    });
    newIssue.save((err, result) => {
        if (err) {
            logger.error(err);
            let apiResonse = response.generate(true, "Couldn't create issue", 500, null);
            res.status(apiResonse.status).send(apiResonse);

        } else {
            logger.info("New Issue created successfully");
            resultObj = newIssue.toObject();
            let apiResponse = response.generate(false, "New Issue created successfully", 201, resultObj);
            res.send(apiResponse);
        }
    });

}



let getSingleIssue = (req, res) => {

    let issueId = req.params.issueId;

    let verifyId = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("No issue id found");
                let apiResponse = response.generate(true, "No user id found", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verifyId

    let findIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ issueId: issueId })
            .select('-__v -_id').lean()
            .exec((err, result) => {
                if (err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error('No Issue Found');
                    let apiResponse = response.generate(true, 'No Issue Found', 404, null);
                    reject(apiResponse);
                } else {
                    logger.info('Issue Found');
                    resolve(result);
                }
            });
        });
    } // end of findIssue
    

    verifyId(req, res)
    .then(findIssue)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Issue found successfully", 200, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    });
}


let editIssue = (req, res) => {
    let issueId = req.params.issueId;
    let options = req.body;
    options.modifiedOn = time.now();
    let imagePath = req.body.imagePath;


    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string");
                let apiResponse = response.generate(true, "Empty userId string, couldn't locate user", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verify input

    let findIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ 'issueId': issueId }).select('-_id -__v').lean().exec((err, result) => {
                if (err) {
                    logger.error(`Error occurred: ${err}`);
                    let apiResponse = response.generate(true, "Couldn't locate issue", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error(`Cannot find Issue`);
                    let apiResponse = response.generate(true, "Couldn't locate Issue", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info(`Found issue`);
                    resolve(result);
                }
            });
        });
    } // end of find issue

    let updateIssue = () => {

        if (req.file) {
            const url = req.protocol + '://' + req.get("host");
            imagePath = url + "/images/" + req.file.filename;
            options.imagePath = imagePath;
        }

        return new Promise((resolve, reject) => {
            IssueModel.update({ 'issueId': issueId }, options).exec((err, result) => {
                
                if (err) {
                    logger.error(`Error occurred: ${err}`);
                    let apiResponse = response.generate(true, "failed to update user", 503, null);
                    reject(apiResponse);
                } else if(result.n > 0) {
                    logger.info(`Issue updated successfully`);
                    resolve(result);
                } else {
                    logger.error("No new data found to update");
                    let apiResponse = response.generate(true, "No new data found to update", 404, null);
                    reject(apiResponse);
                }
            });
        });
    } // end of update issue


    verifyInput(req, res)
    .then(findIssue)
    .then(updateIssue)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Issue update successfully", 201, null);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    });

}


let removeIssue = (req, res) => {
    let issueId = req.params.issueId;


    let deleteIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.deleteOne({ 'issueId': issueId, 'creatorId': req.user.userId })
                .exec((err, result) => {
                    if (err) {
                        logger.error(err);
                        let apiResponse = response.generate(true, "Couldn't delete the issue", 500, null);
                        reject(apiResponse);
                    } else if (result.result.n > 0) {
                        logger.info("Issue removed successfully");
                        resolve(result);

                    } else {
                        logger.error(`Couldn't found the issue while deleting it`);
                        let apiResponse = response.generate(true, "Couldn't delete the issue, invalid Id", 404, null);
                        reject(apiResponse);
                    }
                });
        });
    } // end of remove issue

    let removeAssigneesOnIssue = (req, res) => {
        return new Promise((resolve, reject) => {
            AssignModel.deleteMany({ issueId: issueId})
            .exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Couldn't remove assignees on issue", 500, null);
                    reject(apiResponse);
                } else if (result.result.n > 0) {
                    logger.info("Assignees on Issue removed successfully");
                    resolve(result);
                } else {
                    logger.error(`Couldn't found any assignee on issue`);
                    resolve(result);
                }
            })
        })
    } //end of remove assignee on issue

    let removeWatchersOnIssue = (req, res) => {
        return new Promise((resolve, reject) => {
            WatchModel.deleteMany({issueId: issueId})
            .exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Couldn't remove watchers on the issue", 500, null);
                    reject(apiResponse);
                } else if(result.result.n > 0) {
                    resolve(result);
                } else {
                    logger.error(`Couldn't found any watcher on issue`);
                    resolve(result);
                }
            })
        })
    } //end of remove watchers on the issue

    let removeCommentsOnIssue = (req, res) => {
        return new Promise((resolve, reject) => {
            CommentModel.deleteMany({issueId: issueId})
            .exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Couldn't remove watchers on the issue", 500, null);
                    reject(apiResponse);
                } else if (result.result.n > 0) {
                    resolve(result);
                } else {
                    logger.error(`Couldn't found any comment on issue`);
                    let apiResponse = response.generate(true, "Couldn't found any comment on issue", 404, null);
                    reject(apiResponse);
                }
            })
        })
    }



    deleteIssue(req, res)
        .then(removeAssigneesOnIssue)
        .then(removeWatchersOnIssue)
        .then(removeCommentsOnIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Issue and everything associated with it was removed successfully", 201, null);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        });

}


let addComment = (req, res) => {
    let issueId = req.body.issueId;
    let creatorId = req.user.userId;
    let creatorName = req.user.fullName;

    let issueDetails = '';

    let issueExists = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ issueId: issueId })
            .select('-_id -__v').lean().exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Error occurred while searching for the issue", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)){
                    logger.error("Couldn't find the issue to comment");
                    let apiResponse = response.generate(true, "Unable to find the issue to comment on it", 404, null);
                    reject(apiResponse);
                } else {
                    issueDetails = result
                    resolve(req);
                }
            });
        }); 
        
    } // end of issue exists
    

    let createComment = () => {

        let newComment = new CommentModel({
            commentId: shortid.generate(),
            comment: req.body.comment,
            issueId: issueDetails.issueId,
            creatorId: creatorId,
            creatorName: creatorName,
            createdOn: time.now()
        });

        return new Promise((resolve, reject) => {
            newComment.save((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Unable to add comment", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info("Comment created successfully");
                    let resultObj = newComment.toObject();
                    delete resultObj.__v;
                    delete resultObj._id;
                    resolve(resultObj);
                }
            });
        });
    } // end of createComment

    issueExists(req, res)
    .then(createComment)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Comment was added successfully", 201, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    })


}


let getAllCommentOnIssue = (req, res) => {
    let issueId = req.params.issueId;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string");
                let apiResponse = response.generate(true, "Empty issueId string, couldn't locate issue", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verify input
    
    let findComments = () => {
        return new Promise((resolve, reject) => {
            CommentModel.find({'issueId': issueId})
            .select('-_id -__v').lean().exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Unable to retrieve comments", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    logger.error("No comments found for the Issue");
                    let apiResponse = response.generate(true, "No comments found for the Issue", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info("All comments retrivied successfully");
                    resolve(result);
                }
            });
        });
    } // end of find comments

    verifyInput(req, res)
    .then(findComments)
    .then((resolve) => {
        let apiResponse = response.generate(false, "All comments retrivied successfully", 200, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    });

}


let deleteComment = (req, res) => {
    let userId = req.user.userId;
    let commentId = req.body.commentId;
    let issueId = req.body.issueId;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(commentId)) {
                logger.error("Empty commentId string");
                let apiResponse = response.generate(true, "Empty commentId string, couldn't locate comment", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verify input

    let removeComment = () => {
        return new Promise((resolve, reject) => {
            CommentModel.deleteOne({ commentId: commentId, creatorId: userId, issueId: issueId })
            .exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Error occurred while deleting comment", 500, null);
                    reject(apiResponse);
                } else if(result.result.n > 0) {
                    logger.info("Successfully deleted comment");
                    resolve(result);
                } else {
                    logger.error("Invalid comment id");
                    let apiResponse = response.generate(true, "Unable to delete comment, check the comment id", 404, null);
                    reject(apiResponse);
                }
            });
        });
    } // end of removeComment

    verifyInput(req, res)
    .then(removeComment)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Successfully deleted comment", 201, null);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    });

}


let addToWatchList = (req, res) => {
    let issueId = req.body.issueId;
    let userId = req.user.userId;
    let userName = req.user.fullName;

    verifyIfExists = () => {
        return new Promise((resolve, reject) => {
            WatchModel.find({ issueId: issueId, userId: userId}).lean()
            .exec((err,result) => {
                if(err) {
                    logger.error(err);
                    let apiResonse = response.generate(true, "Couldn't verify if user is already to watch list", 500, null);
                    reject(apiResonse);
                } if(check.isEmpty(result)) {
                    resolve(req);
                } else {
                    logger.error("User already in the watch list of the issue");
                    let apiResonse = response.generate(true, "User already in the watch list of the issue", 304, null);
                    reject(apiResonse);
                }
            })
        });
    }


    addToWatcher = () => {
        let newWatcher = new WatchModel({
            watcherId: shortid.generate(),
            issueId: issueId,
            userId: userId,
            userName: userName,
            addedOn: time.now()
        });
        return new Promise((resolve, reject) => {
            newWatcher.save((err, result) => {
                if (err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Unable to add you to watch list", 500, null);
                    reject(apiResponse)
                } else {
                    logger.info("successfully added to watch list");
                    watcherObj = newWatcher.toObject();
                    resolve(watcherObj);
                }
            });
        })
    }

    verifyIfExists(req, res)
    .then(addToWatcher)
    .then((resolve) => {
        let apiResponse = response.generate(false, "You were successfully added to watch list for this issue", 201, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    }); 
    
}


let getAllWatchersOnIssue = (req, res) => {
    issueId = req.params.issueId;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string");
                let apiResponse = response.generate(true, "Empty issueId string, couldn't locate issue", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verify input

    let findWatchers = () => {
        return new Promise((resolve, reject) => {
            WatchModel.find({ 'issueId': issueId })
                .select('-_id -__v').lean().exec((err, result) => {
                   
                    if (err) {
                        logger.error(err);
                        let apiResponse = response.generate(true, "Unable to retrieve comments", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("No watchers found for the Issue");
                        let apiResponse = response.generate(true, "No watchers found for the Issue", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("All watchers retrivied successfully");
                        resolve(result);
                    }
                });
        });
    } // end of find watchers

    verifyInput(req, res)
    .then(findWatchers)
    .then((resolve) => {
        let apiResponse = response.generate(false, "All Watchers retrivied successfully", 200, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    });

}


let addAssignee = (req, res) => {
    let issueId = req.body.issueId;
    let assignerId = req.user.userId;
    let assignerName = req.user.fullName;
    let assignedToUser = '';
    let assignedToId = req.body.assignedTo;

    


    let findUser = () => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: assignedToId }).lean().exec((err, result) => {
                if (err) {
                    logger.error(err);
                    let apiResonse = response.generate(true, "Couldn't find the user", 500, null);
                    reject(apiResonse);
                } if (check.isEmpty(result)) {
                    logger.error(`No user found`);
                    let apiResonse = response.generate(true, "Couldn't find the user", 404, null);
                    reject(apiResonse);
                } else {
                    assignedToUser = result.fullName;
                    resolve(req);
                }
            })
        });
    }

    let checkIfExists = () => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ issueId: issueId, assignedToId: assignedToId })
            .exec((err, result) => {
                if(err) {
                    logger.error(err);
                    let apiResonse = response.generate(true, "Couldn't add user to assignee for the issue, server error", 500, null);
                    reject(apiResonse);
                } else if(check.isEmpty(result)) {
                    resolve(req);
                } else {
                    logger.error(`User already present in assignee list for the issue`);
                    let apiResponse = response.generate(true, "User already present in assignee list for the issue", 304, null);
                    reject(apiResponse);
                }
            })
        })
        
    }

    let createAssignee = () => {
        let newAssignee = new AssignModel({
            assignId: shortid.generate(),
            issueId: issueId,
            assignedById: assignerId,
            assignedByName: assignerName,
            assignedToId: assignedToId,
            assignedToName: assignedToUser,
            assignedOn: time.now()
        });

        return new Promise((resolve, reject) => {
            newAssignee.save((err, result) => {
                if (err) {
                    logger.error(err);
                    let apiResonse = response.generate(true, "Unable to assign an assignee", 500, null);
                    reject(apiResonse);
                } else {
                    logger.info("new Assignee created successfully");
                    resolve(result);
                }
            });
        })
    }

    findUser(req, res)
    .then(checkIfExists)
    .then(createAssignee)
    .then((resolve) => {
        let apiResponse = response.generate(false, "New assignee created successfully", 201, resolve);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    });    

}


let getAllAssigneeOnIssue = (req, res) => {
    let issueId = req.params.issueId;
    
    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string");
                let apiResponse = response.generate(true, "Empty issueId string, couldn't locate issue", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verify input

    let findAssignee = () => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ issueId: issueId }).select('-__v -_id').lean()
            .exec((err, result) => {
                if (err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "Unable to get assignees on the issue, server error", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("No assignee found for the Issue");
                    let apiResponse = response.generate(true, "No comments found for the Issue", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info("All assignees retrivied successfully");
                    resolve(result);
                }
            })
        });
    }

    verifyInput(req, res)
    .then(findAssignee)
    .then((resolve) => {
        let apiResonse = response.generate(false, "All assignees retrivied successfully", 200, resolve);
        res.send(apiResonse);
    }).catch((err) => {
        res.send(err);
    });

}


let removeAssigneeOnIssue = (req, res) => {
    let assignId = req.params.assignId;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(assignId)) {
                logger.error("Empty commentId string");
                let apiResponse = response.generate(true, "Empty assignId string, couldn't locate assignee", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verify input

    let removeAssignee = () => {
        return new Promise((resolve, reject) => {
            AssignModel.deleteOne({assignId: assignId}).exec((err, result)=> {
                if(err) {
                    logger.error(err);
                    let apiResponse = response.generate(true, "There was an error so we coukdn't remove the assignee", 500, null);
                    reject(apiResponse);
                } else if (result.result.n > 0) {
                    logger.info("Successfully removed assignee");
                    resolve(result);
                } else {
                    logger.error("Invalid assign id");
                    let apiResponse = response.generate(true, "Unable to remove assignee, check the assign id", 404, null);
                    reject(apiResponse);
                }
            })
        });
    }

    verifyInput(req, res)
    .then(removeAssignee)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Successfully removed assignee from the issue", 201, null);
        res.send(apiResponse);
    }).catch((err) => {
        res.send(err);
    })

}


let getAllIssuesByUserCount = (req, res) => {
    let userId = req.user.userId;

    IssueModel.count({ creatorId: userId }).exec((err, count) => {
        if(err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all issue by user", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of issue added by user retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}


let getIssuesDone = (req, res) => {
    IssueModel.count({ status: 'done' }).exec((err, count) => {
        if (err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all done issues", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of issue in done status retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}


let getIssuesInProgress = (req, res) => {
    IssueModel.count({ status: 'in-progress' }).exec((err, count) => {
        if (err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all in-progress issues", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of issue in-progress status retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}


let getIssuesInTest = (req, res) => {
    IssueModel.count({ status: 'in-test' }).exec((err, count) => {
        if (err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all in-test issues", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of issue in-test status retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}


let getIssuesInBacklog = (req, res) => {
    IssueModel.count({ status: 'backlog' }).exec((err, count) => {
        if (err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all backlog issues", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of issue in backlog status retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}


let getAllIssuesCount = (req, res) => {
    IssueModel.count({}).exec((err, count) => {
        if (err) {
            logger.error(err);
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all the issues", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of all the issues retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}



module.exports = {
    getAllIssue: getAllIssue,
    getAllIssuesOnUser: getAllIssuesOnUser,
    createIssue: createNewIssue,
    getSingleIssue: getSingleIssue,
    editIssue: editIssue,
    deleteIssue: removeIssue,
    addComment: addComment,
    getAllCommentOnIssue: getAllCommentOnIssue,
    deleteComment: deleteComment,
    addToWatchList: addToWatchList,
    getAllWatchersOnIssue: getAllWatchersOnIssue,
    addAssignee: addAssignee,
    getAllAssigneeOnIssue: getAllAssigneeOnIssue,
    removeAssigneeOnIssue: removeAssigneeOnIssue,
    getAllIssuesByUserCount: getAllIssuesByUserCount,
    getIssuesDone: getIssuesDone,
    getIssuesInProgress: getIssuesInProgress,
    getIssuesInTest: getIssuesInTest,
    getIssuesInBacklog: getIssuesInBacklog,
    getAllIssuesCount: getAllIssuesCount
};
