const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const tokenLib = require('./../libs/tokenLib');
const validateInput = require('../libs/paramsValidationLib');
const passwordLib = require('./../libs/passwordLib');
const check = require('./../libs/checkLib');

/* Models */
const UserModel = require('./../models/User');
const AuthModel = require('./../models/Auth');


// start user signup function 
let signUpUser = (req, res) => {
    let newUser = new UserModel({
        userId: shortid.generate(),
        firstName: req.body.firstName,
        lastName: req.body.lastName || '',
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email.toLowerCase(),
        mobileNumber: req.body.mobileNumber,
        password: passwordLib.hashpassword(req.body.password),
        createdOn: time.now()
    });



    let ifUserExists = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: req.body.email}).exec((err, result) => {
                if(err) {
                    logger.error(`Error occurred: ${err.message}`, "UserController: signUpUser(): ifUserExists()", "high");
                    let apiResponse = response.generate(true, "Error while checking user email", 503, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    resolve(req);
                } else {
                    logger.error("User with same email already exists", "UserController: signUpUser(): ifUserExists()", "med");
                    let apiResponse = response.generate(true, "User with same email already exists", 503, null);
                    reject(apiResponse);
                }
            });
        });
    } //end of ifUserExists


    let createUser = () => {
        return new Promise((resolve, reject) => {
            newUser.save((err, result) => {
                if(err) {
                    logger.error(`${err}`, "UserController: signUpUser(): createUser()", "high");
                    let apiResponse = (true, "Error while creating user", 503, null);
                    reject(apiResponse);
                } else {
                    let newUserObj = newUser.toObject();

                    delete newUserObj.password;
                    delete newUserObj._id;
                    delete newUserObj.__v;
                    delete newUserObj.createdOn;

                    resolve(newUserObj);
                }
            });
        });
    } //end of createUser

    let generateToken = (userDetailsObj) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetailsObj, (err, tokenDetails) => {
                if (err) {
                    logger.error(`${err}`, "UserController: signUpUser(): generateToken()", "med");
                    let apiResponse = response.generate(true, "Failed to generate token", 503, null);
                    reject(apiResponse);
                } else {
                    logger.info("Token generated successfully", "UserController: loginUser(): generateToken()", "successful");
                    tokenDetails.userId = userDetailsObj.userId;
                    tokenDetails.expiresIn = 86395;
                    tokenDetails.userDetails = userDetailsObj;
                    resolve(tokenDetails);
                }
            });
        });
    }// end of generate token
    
    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }).exec((err, result) => {
                if (err) {
                    logger.error(`Error occurred: ${err.message}`, "UserController: saveToken()", "med");
                    let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.authToken,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    });

                    newAuthToken.save((error, saveResult) => {
                        if (error) {
                            logger.error(`Error occurred: ${err.message}`, "UserController: saveToken()", "high");
                            let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                            reject(apiResponse);
                        } else {
                            let response = {
                                authToken: saveResult.authToken,
                                userId: tokenDetails.userId,
                                expiresIn: tokenDetails.expiresIn,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(response);
                        }
                    });

                } else {

                    result.authToken = tokenDetails.authToken;
                    result.tokenSecret = tokenDetails.tokenSecret;
                    result.tokenGenerationTime = time.now();

                    result.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(`${err}`, "userController: saveToken()", "high");
                            let apiResponse = response.generate(true, "Failed to generate Token", 500, null);
                            reject(apiResponse);
                        } else {
                            let response = {
                                authToken: newTokenDetails.authToken,
                                userId: tokenDetails.userId,
                                expiresIn: tokenDetails.expiresIn,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(response);
                        }
                    });
                }
            })
        });
    }// end of save token 



    if (!req.body.email) {
        logger.error("Missing fields", "UserController: signUpUser(): validateUserInput()", "high");
        let apiResponse = response.generate(true, "One or more parameter(s) missing", 500, null);
        res.send(apiResponse);
    } else {
        if (!validateInput.email(req.body.email)) {
            logger.error("Email doesn't match the required parameters", "UserController: signUpUser(): validateUserInput()", "med");
            let apiResponse = response.generate(true, "Email doesn't match the required parameters", 401, null);
            res.send(apiResponse);
        } else if (!validateInput.password(req.body.password)) {
            logger.error("Password doesn't match the required parameters", "UserController: signUpUser(): validateUserInput()", "med");
            let apiResponse = response.generate(true, "Password doesn't match the required parameters", 401, null);
            res.send(apiResponse);
        } else {
            ifUserExists(req, res)
            .then(createUser)
            .then(generateToken)
            .then(saveToken)
            .then((resolve) => {
                // delete resolve.password;
                // delete resolve._id;
                // delete resolve.__v;
                // delete resolve.createdOn;

                let apiResponse = response.generate(false, "User created successfully", 201, resolve);
                res.status(apiResponse.status).send(apiResponse);
            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: signUpUser()", "high");
                res.status(err.status).send(err);
            });
        }
    }

}// end user signup function 


// start of login function 
let loginUser = (req, res) => {
    
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if(req.body.email) {
                UserModel.findOne({ email: req.body.email }).exec((err, result) => {
                    if(err) {
                        logger.error("Failed to find user", "UserController: LoginUser(): findUser()", "high");
                        let apiResponse = response.generate(true, "failed to find user data", 503, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("User not found", "UserController: LoginUser(): findUser()", "med");
                        let apiResponse = response.generate(true, "User not found with the provided email, please signup", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("User found successfully", "UserController: LoginUser(): findUser()", "successful");
                        resolve(result);
                    }
                });

            } else {
                logger.error("Email not present", "UserController: LoginUser(): findUser()", "low");
                let apiResponse = response.generate(true, "Email parameter is missing", 503, null);
                reject(apiResponse);
            }
        });
    } //end of find user


    let validatePassword = (userDetails) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, userDetails.password, (err, match) => {
                
                if(err) {
                    logger.error(`${err}`, "UserController: LoginUser(): validatePassword()", 'med');
                    let apiResponse = response.generate(true, "Couldn't validate user's password", 401, null);
                    reject(apiResponse);
                } else if(match) {
                    let userDetailsObj = userDetails.toObject();

                    delete userDetailsObj.password;
                    delete userDetailsObj._id;
                    delete userDetailsObj.__v;
                    delete userDetailsObj.createdOn;

                    resolve(userDetailsObj);
                    
                }
            })
        })
    }// end of validate password

    let generateToken = (userDetailsObj) => {

        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetailsObj, (err, tokenDetails) => {
                if(err) {
                    logger.error(`${err}`, "UserController: generateToken()", "med");
                    let apiResponse = response.generate(true, "Failed to generate token", 503, null);
                    reject(apiResponse);
                } else {
                    logger.info("Token generated successfully", "UserController: loginUser(): generateToken()", "successful");
                    tokenDetails.userId = userDetailsObj.userId;
                    tokenDetails.expiresIn = 86395;
                    tokenDetails.userDetails = userDetailsObj;
                    resolve(tokenDetails);
                }
            });
        });
    }// end of generate token


    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }).exec((err, result) => {
                if(err) {
                    logger.error(`Error occurred: ${err.message}`, "UserController: saveToken()", "med");
                    let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.authToken,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    });

                    newAuthToken.save((error, saveResult) => {
                        if(error) {
                            logger.error(`Error occurred: ${err.message}`, "UserController: saveToken()", "high");
                            let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                            reject(apiResponse);
                        } else {
                            let response = {
                                authToken: saveResult.authToken,
                                userId: tokenDetails.userId,
                                expiresIn: tokenDetails.expiresIn,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(response);
                        }
                    });

                } else {

                    result.authToken = tokenDetails.authToken;
                    result.tokenSecret = tokenDetails.tokenSecret;
                    result.tokenGenerationTime = time.now();

                    result.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(`${err}`, "userController: saveToken()", "high");
                            let apiResponse = response.generate(true, "Failed to generate Token", 500, null);
                            reject(apiResponse);
                        } else {
                            let response = {
                                authToken: newTokenDetails.authToken,
                                userId: tokenDetails.userId,
                                expiresIn: tokenDetails.expiresIn,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(response);
                        }
                    });
                }
            })
        });
    }// end of save token 



    findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then((resolve) => {
        
        let apiResponse = response.generate(false, "User logged in successfully", 201, resolve);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    });

}
// end of the login function 


//google login handler
let loginWithGoogle = (req, res) => {

    let newUser = new UserModel({
        userId: shortid.generate(),
        firstName: req.body.firstName,
        lastName: req.body.lastName || '',
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email.toLowerCase(),
        createdOn: time.now()
    });


    let createUser = () => {
        return new Promise((resolve, reject) => {
            newUser.save((err, result) => {
                if (err) {
                    logger.error(`${err}`, "UserController: loginWithGoogle(): createUser()", "high");
                    let apiResponse = (true, "Error while creating user", 503, null);
                    reject(apiResponse);
                } else {
                    let newUserObj = newUser.toObject();

                    delete newUserObj.password;
                    delete newUserObj._id;
                    delete newUserObj.__v;
                    delete newUserObj.createdOn;

                    resolve(newUserObj);
                }
            });
        });
    } //end of createUser

    let generateToken = (userDetailsObj) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetailsObj, (err, tokenDetails) => {
                if (err) {
                    logger.error(`${err}`, "UserController: loginWithGoogle(): generateToken()", "med");
                    let apiResponse = response.generate(true, "Failed to generate token", 503, null);
                    reject(apiResponse);
                } else {
                    logger.info("Token generated successfully", "UserController: loginWithGoogle(): generateToken()", "successful");
                    tokenDetails.userId = userDetailsObj.userId;
                    tokenDetails.expiresIn = 86395;
                    tokenDetails.userDetails = userDetailsObj;
                    resolve(tokenDetails);
                }
            });
        });
    }// end of generate token


    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId }).exec((err, result) => {
                if (err) {
                    logger.error(`${err.message}`, "UserController: loginWithGoogle(): saveToken()", "med");
                    let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.authToken,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    });

                    newAuthToken.save((error, saveResult) => {
                        if (error) {
                            logger.error(`Error occurred: ${err.message}`, "UserController: loginWithGoogle(): saveToken()", "high");
                            let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                            reject(apiResponse);
                        } else {
                            let response = {
                                authToken: saveResult.authToken,
                                userId: tokenDetails.userId,
                                expiresIn: tokenDetails.expiresIn,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(response);
                        }
                    });

                } else {

                    result.authToken = tokenDetails.authToken;
                    result.tokenSecret = tokenDetails.tokenSecret;
                    result.tokenGenerationTime = time.now();

                    result.save((err, newTokenDetails) => {
                        if (err) {
                            logger.error(`${err}`, "userController: loginWithGoogle(): saveToken()", "high");
                            let apiResponse = response.generate(true, "Failed to generate Token", 500, null);
                            reject(apiResponse);
                        } else {
                            let response = {
                                authToken: newTokenDetails.authToken,
                                userId: tokenDetails.userId,
                                expiresIn: tokenDetails.expiresIn,
                                userDetails: tokenDetails.userDetails
                            }

                            resolve(response);
                        }
                    });
                }
            })
        });
    }// end of save token 


    //Actual execution
    //checking if user exists
    UserModel.findOne({email: req.body.email}).lean().exec((err, result) => {
        if(err) {
            logger.error(`${err}`, "UserController: loginWithGoogle(): find User", "high");
            let apiResponse = response.generate(true, "Server Error", 503, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)) {
            createUser(req, res)
            .then(generateToken)
            .then(saveToken)
            .then((resolve) => {
                let apiResponse = response.generate(false, "Login was successful", 201, resolve);
                res.send(apiResponse);
            }).catch((err) => {
                res.send(err);
            });
        } else {
            delete result._id;
            delete result.__v;

            generateToken(result)
            .then(saveToken)
            .then((resolve) => {
                let apiResponse = response.generate(false, "Login was successful", 201, resolve);
                res.send(apiResponse);
            }).catch((err) => {
                res.send(err);
            });
        }
    })
}


let getAllUsers = (req, res) => {
    UserModel.find().select('-password -__v -_id').lean()
    .exec((err, result) => {
        if(err) {
            logger.error(`${err}`, "UserController: getAllUsers()", 'med');
            let apiResponse = response.generate(true, "Unable to retrieve users", 503, null);
            res.status(apiResponse.status).send(apiResponse);
        } else if(check.isEmpty(result)) {
            logger.error(`No user found in Database`, "UserController: getAllUsers()", 'med');
            let apiResponse = response.generate(true, "No users found", 404, null);
            res.status(apiResponse.status).send(apiResponse);
        } else {
            logger.info("All users fetched successfully", "UserController: getAllUsers()", "successful");
            let apiResponse = response.generate(false, "All users fetched successfully", 200, result);
            res.status(apiResponse.status).send(apiResponse);
        }
    });
} // end of get all users


let getSingleUser = (req, res) => {
    
    let userId = req.params.userId;

    let verifyId = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(userId)) {
                logger.error("No user id found", "UserController: getSingleUser(): verifyId()", "low");
                let apiResponse = response.generate(true, "No user id found", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        }); 
    } // end of verifyId

    let findUser = () => {
        
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'userId': userId })
            .select('-password -__v -_id').lean()
            .exec((err, result) => {
                if (err) {
                    logger.error(err.message, 'UserController: getSingleUser(): findUser()', "med");
                    let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error('No User Found', 'User Controller: getSingleUser(): findUser()', "low");
                    let apiResponse = response.generate(true, 'No User Found', 404, null);
                    reject(apiResponse);
                } else {
                    logger.info('User Found', 'User Controller: getSingleUser(): findUser()', "successful");
                    resolve(result);
                }
            });
        });
        
        
    } // end of findUser

    verifyId(req, res)
    .then(findUser)
    .then((resolve) => {
        let apiResponse = response.generate(false, "User found successfully", 200, resolve);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        logger.error(`Error: ${err.message}`, "UserController: getSingleUser(): catch()", "med");
        res.status(err.status).send(err);
    });



} // end of get single user


let editUser = (req, res) => {
    let userId = req.params.userId;
    let options = req.body;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if(check.isEmpty(userId)) {
                logger.error("Empty userId string", "UserController: editUser(): verifyInput()", "low");
                let apiResponse = response.generate(true, "Empty userId string, couldn't locate user", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    }


    let findUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({'userId': userId}).exec((err, result) => {
                if(err) {
                    logger.error(`${err}`, "UserController: editUser(): findUser()", "high");
                    let apiResponse = response.generate(true, "Couldn't locate user", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    logger.error(`Cannot find user`, "UserController: editUser(): findUser()", "high");
                    let apiResponse = response.generate(true, "Couldn't locate user", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info(`Found user`, "UserController: editUser(): findUser()", "successful");
                    resolve(req);
                }
            });
        });
    }

    let updateUser = () => {
        return new Promise((resolve, reject) => {
            
            UserModel.updateOne({ 'userId': userId }, options).exec((err, result) => {
                if (err) {
                    logger.error(`${err}`, "UserController: editUser(): updateUser()", "high");
                    let apiResponse = response.generate(true, "failed to update user", 503, null);
                    reject(apiResponse);
                } else if (result.result.n > 0) {
                    logger.info(`User updated successfully`, "UserController: editUser(): updateUser()", "successful");
                    resolve(result);
                } else {
                    logger.error("No new data found to update user", "UserController: editUser(): updateUser()", "med");
                    let apiResponse = response.generate(true, "No new data found to update user", 404, null);
                    reject(apiResponse);
                }
            });
            
        });
    }

    verifyInput(req, res)
    .then(findUser)
    .then(updateUser)
    .then((resolve) => {
        let apiResponse = response.generate(false, "User updated successfully", 201, null);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    });


}// end of get edit user


let logout = (req, res) => {
    AuthModel.deleteOne({'userId': req.user.userId}).exec((err, result) => {
        if(err) {
            logger.error(`${err}`, "UserController: Logout()", "high");
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null);
            res.status(apiResponse.status).send(apiResponse);
        } else if(result.result.n > 0) {
            logger.info("User logged out successfully", "UserController: logout()", "successful");
            let apiResponse = response.generate(false, "User logged out successfully", 201, null);
            res.status(apiResponse.status).send(apiResponse);
        } else {
            logger.error("User already logged out or invalid userId", "UserController: logout()", 'med');
            let apiResponse = response.generate(true, "User already logged out or invalid userId", 404, null);
            res.status(apiResponse.status).send(apiResponse);
        }
    });
} // end of the logout function.


let deleteUser = (req, res) => {
    let userId = req.params.userId;

    let validateParam = () => {
        return new Promise((resolve, reject) => {
            if(check.isEmpty(userId)) {
                logger.error("Empty user Id", "UserController: deleteUser(): validateParam()", "med");
                let apiResponse = response.generate(true, "Invalid or empty userId", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        }); 
    }// end of validateParam

    let findUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ 'userId': userId }).exec((err, result) => {
                if (err) {
                    logger.error("Failed to find user", "UserController: deleteUser(): findUser()", "high");
                    let apiResponse = response.generate(true, "failed to find user data", 503, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error("User not found", "UserController: deleteUser(): findUser()", "med");
                    let apiResponse = response.generate(true, "User not found with the provided email, please signup", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info("User found successfully", "UserController: deleteUser(): findUser()", "successful");
                    resolve(result);
                }
            });

        });
    } //end of find user

    let removeUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.deleteOne({'userId': userId})
            .exec((err, result) => {
                if(err) {
                    logger.error(`${err}`, "UserController: deleteUser(): removeUser()", "high");
                    let apiResponse = response.generate(true, "Unable to delete user", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info("User found and deleted as per request", "UserController: deleteUser(): removeUser()", "successful");
                    let apiResponse = response.generate(false, "User successfully removed", 201, result);
                    resolve(apiResponse);
                }
            });
        });
    }// end of remove user 

    let removeAuth = () => {
        return new Promise((resolve, reject) => {
            AuthModel.deleteOne({ 'userId': userId })
            .exec((err, removed) => {
                if (err) {
                    logger.error(`${err}`, "UserController: deleteUser(): removeAuth()", "high");
                    let apiResponse = response.generate(true, "Unable to delete user auth", 500, null);
                    reject(apiResponse);
                } else if (removed.result.n > 0) {
                    logger.info("User and its auth deleted as per request", "UserController: deleteUser(): removeAuth()", "successful");
                    let apiResponse = response.generate(false, "User successfully removed", 201, result);
                    resolve(apiResponse);
                } else {
                    logger.error("Couldn't delete auth, invalid userId", "UserController: deleteUser(): removeAuth()", "med");
                    let apiResponse = response.generate(true, "Couldn't delete user auth, invalid userId", 404, null);
                    reject(apiResponse);
                }
            });
        });
        
    }// end of remove auth


    validateParam(req, res)
    .then(findUser)
    .then(removeUser)
    .then(removeAuth)
    .then((resolve) => {
        let apiResponse = response.generate(false, "User deleted successfully", 201, resolve);
        res.status(apiResponse.status).send(apiResponse);
    }).catch((err) => {
        res.status(err.status).send(err);
    });

} // end of the delete user 


let getAllUsersCount = (req, res) => {
    UserModel.count({}).exec((err, count) => {
        if (err) {
            logger.error(`${err}`, "UserController: getAllUsersCount()", "high");
            let apiResponse = response.generate(true, "Server error couldn't retrieve count of all users", 500, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Count of all users retrieved", 200, count);
            res.send(apiResponse);
        }
    });
}


module.exports = {
    signUpUser: signUpUser,
    loginUser: loginUser,
    loginWithGoogle: loginWithGoogle,
    logout: logout,
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllUsersCount: getAllUsersCount
};// end exports