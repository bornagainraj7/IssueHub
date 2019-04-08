const express = require("express");
const issueController = require('./../controllers/issueController');
const appConfig = require("./../../config/appConfig");
const ImageHandler = require('./../middlewares/multer');
const auth = require('./../middlewares/auth');

const router = express.Router();

module.exports.setRouter = (route) => {

    let baseUrl = `${appConfig.api}/issue`;


    route.get(`${baseUrl}/all`, issueController.getAllIssue);


    route.get(`${baseUrl}/assignedTo`, auth.isAuthorised, issueController.getAllIssuesOnUser);


    route.get(`${baseUrl}/:issueId`, issueController.getSingleIssue);


    route.post(`${baseUrl}/create`, auth.isAuthorised, ImageHandler, issueController.createIssue);


    route.put(`${baseUrl}/edit/:issueId`, auth.isAuthorised, ImageHandler, issueController.editIssue);


    route.post(`${baseUrl}/delete/:issueId`, auth.isAuthorised, issueController.deleteIssue);

    //comment routes
    route.post(`${baseUrl}/comment/create`, auth.isAuthorised, issueController.addComment);


    route.post(`${baseUrl}/comment/delete`, auth.isAuthorised, issueController.deleteComment);


    route.get(`${baseUrl}/comment/all/:issueId`, auth.isAuthorised, issueController.getAllCommentOnIssue);

    //WatchList route
    route.post(`${baseUrl}/add/watch`, auth.isAuthorised, issueController.addToWatchList);


    route.get(`${baseUrl}/watch/all/:issueId`, auth.isAuthorised, issueController.getAllWatchersOnIssue);

    //addAssignee route
    route.post(`${baseUrl}/assignee/add`, auth.isAuthorised, issueController.addAssignee);


    route.get(`${baseUrl}/assignee/all/:issueId`, auth.isAuthorised, issueController.getAllAssigneeOnIssue);


    route.get(`${baseUrl}/assignee/remove/:assignId`, auth.isAuthorised, issueController.removeAssigneeOnIssue);

    //count routes
    route.get(`${baseUrl}/count/byuser`, auth.isAuthorised, issueController.getAllIssuesByUserCount);


    route.get(`${baseUrl}/count/done`, auth.isAuthorised, issueController.getIssuesDone);


    route.get(`${baseUrl}/count/inprogress`, auth.isAuthorised, issueController.getIssuesInProgress);


    route.get(`${baseUrl}/count/intest`, auth.isAuthorised, issueController.getIssuesInTest);


    route.get(`${baseUrl}/count/backlog`, auth.isAuthorised, issueController.getIssuesInBacklog);


    route.get(`${baseUrl}/count/all`, auth.isAuthorised, issueController.getAllIssuesCount);

}

