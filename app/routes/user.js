const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const issueController = require("./../../app/controllers/issueController");
const appConfig = require("./../../config/appConfig");

const auth = require('./../middlewares/auth');
const passport = require('passport');


module.exports.setRouter = (route) => {

    let baseUrl = `${appConfig.api}/users`;

    // defining routes.


    route.post(`${baseUrl}/signup`, userController.signUpUser);
    /**
     * @api {post} /api/users/signup SignUp User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} firstName body parameter
	 * @apiParam {String} lastName body parameter
	 * @apiParam {String} email body parameter
	 * @apiParam {String} password body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "User created successfully",
        "status": 201,
        "data": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "tring",
                    "email": "string",
                    "mobileNumber": "number"
                }
            }
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


    route.post(`${baseUrl}/login/google`, userController.loginWithGoogle);
    /**
     * @api {post} /api/users/login/google Login with Google
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": "User created successfully",
        "status": 201,
        "data": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "tring",
                    "email": "string",
                    "mobileNumber": "number"
                }
            }
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


    
    route.post(`${baseUrl}/login`, userController.loginUser);
    /**
     * @api {post} /api/users/login login User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} email body parameter
	 * @apiParam {String} password body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User logged in successfully",
            "status": 201,
            "data": {
                "authToken": "your authToken, which will be valid for next 24hrs",
                "userId": "string",
                "expiresIn": 86395,
                "userDetails": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "string",
                    "fullName": "firstName lastName",
                    "email": "string",
                    "mobileNumber": "number"
                }
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
    
   
    route.post(`${baseUrl}/logout`, auth.isAuthorised, userController.logout);
    /**
     * @api {post} /api/users/logout Logout User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User logged out successfully",
            "status": 201,
            "data": "null"
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


    route.get(`${baseUrl}/all`, auth.isAuthorised, userController.getAllUsers);
    /**
     * @api {get} /api/users/all Retrieve All User
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All users fetched successfully",
            "status": 200,
            "data": [{
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "string",
                    "fullName": "firstName lastName",
                    "email": "string",
                    "createdOn": "Date",
                    "mobileNumber": "number"
                }]
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

    route.get(`${baseUrl}/:userId`, auth.isAuthorised, userController.getSingleUser);
    /**
     * @api {get} /api/users/:userId Retrieve Single User by userId
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId pass userId in URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User found successfully",
            "status": 200,
            "data": {
                    "userId": "string",
                    "firstName": "string",
                    "lastName": "string",
                    "fullName": "firstName lastName",
                    "email": "string",
                    "createdOn": "Date",
                    "mobileNumber": "number"
                }
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

    route.put(`${baseUrl}/edit/:userId`, auth.isAuthorised, userController.editUser);
    /**
     * @api {put} /api/users/edit/:userId Edit Single User by userId
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId pass userId in URL parameter
     * @apiParam {String} details_to_edit details should be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User updated successfully",
            "status": 201,
            "data": "null"
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


    route.post(`${baseUrl}/delete/:userId`, auth.isAuthorised, userController.deleteUser);
    /**
     * @api {post} /api/users/delete/:userId Delete Single User by userId
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId pass userId in URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User deleted successfully",
            "status": 201,
            "data": null
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


    //count routes
    route.get(`${baseUrl}/count/all`, auth.isAuthorised, userController.getAllUsersCount);
    /**
     * @api {get} /api/users/count/all number of total signedup users
     * @apiVersion 1.0.0
     * @apiGroup Count
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count of all users retrieved",
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


