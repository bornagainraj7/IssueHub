const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');
const tokenLib = require('./../libs/tokenLib');
const check = require('./../libs/checkLib');

const AuthModel = require('./../models/Auth');


let isAuthorised = (req, res, next) => {
    if (req.query.authToken || req.params.authToken || req.body.authToken || req.header('authToken')) {
        AuthModel.findOne({authToken: req.query.authToken || req.params.authToken || req.body.authToken || req.header('authToken')} )
        .exec((err, authDetails) => {
            if(err) {
                logger.error(`Auth error: ${err}`, "Authorisation middleware", "high");
                let apiResponse = response.generate(true, "Failed to Authorise", 401, null);
                res.send(apiResponse);
            } else if(check.isEmpty(authDetails)) {
                logger.error("No Auth present", "Authorisation middleware","low");
                let apiResponse = response.generate(true, "Invalid or expired authorisation key", 404, null);
                res.send(apiResponse);
            } else {
                tokenLib.verifyToken(authDetails.authToken, authDetails.tokenSecret, (err, decoded) => {
                    if(err) {
                        logger.error(`Error: ${err}`, "Authorisation Middleware", "med");
                        let apiResponse = response.generate(true, "Failed to Authorise", 401, null);
                        res.send(apiResponse);
                    } else {
                        req.user = { 
                            userId: decoded.userId, 
                            fullName: decoded.fullName, 
                            email: decoded.email, 
                            mobileNumber: decoded.mobileNumber
                        };
                        next();
                    }
                });
            }
        });
    } else {
        logger.error("Authorization Token Missing", "Authorization Middleware", "med");
        let apiResponse = response.generate(true, "Authorization key is missing in request", 400, null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuthorised: isAuthorised
}
