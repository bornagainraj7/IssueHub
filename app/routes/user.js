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


    // params: firstName, lastName, email, mobileNumber, password
    route.post(`${baseUrl}/signup`, userController.signUpUser);
    

    route.post(`${baseUrl}/login/google`, userController.loginWithGoogle);
    

    // params: email, password.
    route.post(`${baseUrl}/login`, userController.loginUser);

   
    // auth token params: userId.
    route.post(`${baseUrl}/logout`, auth.isAuthorised, userController.logout);


    route.get(`${baseUrl}/all`, userController.getAllUsers);


    route.get(`${baseUrl}/:userId`, userController.getSingleUser);


    route.put(`${baseUrl}/edit/:userId`, userController.editUser);


    route.post(`${baseUrl}/delete/:userId`, userController.deleteUser);

    //count routes
    route.get(`${baseUrl}/count/all`, auth.isAuthorised, userController.getAllUsersCount);
}


