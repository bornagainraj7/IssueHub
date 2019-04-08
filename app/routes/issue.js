const express = require("express");
const issueController = require('./../controllers/issueController');
const appConfig = require("./../../config/appConfig");
const ImageHandler = require('./../middlewares/multer');
const auth = require('./../middlewares/auth');

const router = express.Router();

module.exports.setRouter = (route) => {

    let baseUrl = `${appConfig.api}/issue`;


    route.get(`${baseUrl}/all`, issueController.getAllIssue);
    /**
     * @api {get} /api/issue/all Retrieve All Issues
     * @apiVersion 1.0.0
     * @apiGroup Issue
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All issue's successfully retrieved",
            "status": 200,
            "data": [{
                        "issueId": "string",
                        "title": "string",
                        "description": "HTML",
                        "imagePath": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "status": "string",
                        "modifiedOn": Date,
                        "createdOn": "Date"
                    }]
            }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.get(`${baseUrl}/assignedto`, auth.isAuthorised, issueController.getAllIssuesOnUser);
    /**
     * @api {get} /api/issue/assignedto Retrieve All Issues assigned to user
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Issue assigned to the user retrivied successfully",
            "status":200,
            "data":[{
                        "issueId": "string",
                        "title": "string",
                        "description": "HTML",
                        "imagePath": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "status": "string",
                        "modifiedOn": Date,
                        "createdOn": "Date"
                }]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/:issueId`,auth.isAuthorised, issueController.getSingleIssue);
    /**
     * @api {get} /api/issue/:issueId Retrieve Single Issues
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL Parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"Issue found successfully",
            "status":200,
            "data":{
                        "issueId": "string",
                        "title": "string",
                        "description": "HTML",
                        "imagePath": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "status": "string",
                        "modifiedOn": Date,
                        "createdOn": "Date"
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.post(`${baseUrl}/create`, auth.isAuthorised, ImageHandler, issueController.createIssue);
    /**
     * @api {post} /api/issue/create Create Issues
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} title to be passed as a body parameter
     *  @apiParam {String} description to be passed as a body parameter
     *  @apiParam {String} imagePath to be passed as a body parameter
     *  @apiParam {String} status to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"New Issue created successfully",
            "status":201,
            "data":{
                        "issueId": "string",
                        "title": "string",
                        "description": "HTML",
                        "imagePath": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "status": "string",
                        "modifiedOn": Date,
                        "createdOn": "Date"
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.put(`${baseUrl}/edit/:issueId`, auth.isAuthorised, ImageHandler, issueController.editIssue);
    /**
     * @api {put} /api/issue/edit/:issueId Edit Issues
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     *  @apiParam {String} title to be passed as a body parameter
     *  @apiParam {String} description to be passed as a body parameter
     *  @apiParam {String} imagePath to be passed as a body parameter
     *  @apiParam {String} status to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"Issue update successfully",
            "status":201,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.post(`${baseUrl}/delete/:issueId`, auth.isAuthorised, issueController.deleteIssue);
    /**
     * @api {post} /api/issue/delete/:issueId Delete Issue by issueId
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} issueId to be passed as URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue removed successfully",
            "status": 201,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */
    
    //comment routes
    route.post(`${baseUrl}/comment/create`, auth.isAuthorised, issueController.addComment);
    /**
     * @api {post} /api/issue/comment/create Create comment on Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a body parameter
     *  @apiParam {String} comment to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"Comment was added successfully",
            "status":201,
            "data":{
                        "commentId": "string",
                        "comment": "string",
                        "issueId": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "createdOn": "Date"
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.post(`${baseUrl}/comment/delete`, auth.isAuthorised, issueController.deleteComment);
     /**
     * @api {post} /api/issue/comment/delete/ Delete comment by comment
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} commentId to be passed as body parameter
     * @apiParam {String} issueId to be passed as body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Successfully deleted comment",
            "status": 201,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/comment/all/:issueId`, auth.isAuthorised, issueController.getAllCommentOnIssue);
    /**
     * @api {get} /api/issue/comment/all/:issueId get All comments on Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All comments retrivied successfully",
            "status":200,
            "data":[{
                        "commentId": "string",
                        "comment": "string",
                        "issueId": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "createdOn": "Date"
                }]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    //WatchList route
    route.post(`${baseUrl}/add/watch`, auth.isAuthorised, issueController.addToWatchList);
    /**
     * @api {post} /api/issue/add/watch Add to Watchlist on Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"You were successfully added to watch list for this issue",
            "status":201,
            "data":{
                        "watcherId": "string",
                        "issueId": "string",
                        "userId": "string",
                        "userName": "string",
                        "addedOn": "Date"
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/watch/all/:issueId`, auth.isAuthorised, issueController.getAllWatchersOnIssue);
    /**
     * @api {get} /api/issue/watch/all/:issueId get All watchers on Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Watchers retrivied successfully",
            "status":200,
            "data":[{
                        "watcherId": "string",
                        "issueId": "string",
                        "userId": "string",
                        "userName": "string",
                        "addedOn": "Date"
                }]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    //addAssignee route
    route.post(`${baseUrl}/assignee/add`, auth.isAuthorised, issueController.addAssignee);
    /**
     * @api {post} /api/issue/assignee/add Add to Assignee on Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a body parameter
     *  @apiParam {String} assignedToId to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"New assignee created successfully",
            "status":201,
            "data":{
                        "assignId": "string",
                        "issueId": "string",
                        "assignedById": "string",
                        "assignedByName": "string",
                        "assignedToId": "string",
                        "assignedToName": "string,
                        "assignedOn": "Date"
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.get(`${baseUrl}/assignee/all/:issueId`, auth.isAuthorised, issueController.getAllAssigneeOnIssue);
    /**
     * @api {post} /api/issue/assignee/all/:issueId Get all Assignee on Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All assignees retrivied successfully",
            "status":200,
            "data":[{
                        "assignId": "string",
                        "issueId": "string",
                        "assignedById": "string",
                        "assignedByName": "string",
                        "assignedToId": "string",
                        "assignedToName": "string,
                        "assignedOn": "Date"
                }]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.get(`${baseUrl}/assignee/remove/:assignId`, auth.isAuthorised, issueController.removeAssigneeOnIssue);
    /**
     * @api {get} /api/issue/assignee/remove/:assignId  Remove an Assignee by assignId
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} assignId to be passed as URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Successfully removed assignee from the issue",
            "status": 201,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    //count routes
    route.get(`${baseUrl}/count/byuser`, auth.isAuthorised, issueController.getAllIssuesByUserCount);
    /**
     * @api {get} /api/issue/count/byuser Count of issue added by user
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of issue added by user retrieved",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/count/done`, auth.isAuthorised, issueController.getIssuesDone);
    /**
     * @api {get} /api/issue/count/done Count of issue with done status
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of issue in done status retrieved",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/count/inprogress`, auth.isAuthorised, issueController.getIssuesInProgress);
    /**
     * @api {get} /api/issue/count/inprogress Count of issue with in-progress status
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of issue in-progress status retrieved",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.get(`${baseUrl}/count/intest`, auth.isAuthorised, issueController.getIssuesInTest);
    /**
     * @api {get} /api/issue/count/intest Count of issue with in-test status
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of issue in-test status retrieved",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/count/backlog`, auth.isAuthorised, issueController.getIssuesInBacklog);
    /**
     * @api {get} /api/issue/count/backlog Count of issue with backlog status
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of issue in backlog status retrieved",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.get(`${baseUrl}/count/all`, auth.isAuthorised, issueController.getAllIssuesCount);
    /**
     * @api {get} /api/issue/count/all Count of all Issues
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of all the issues retrieved",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */



}

