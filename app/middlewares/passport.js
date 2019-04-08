const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./../../config/keys');
const UserModel = require('./../models/User');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const shortid = require('shortid');
const time = require('./../libs/timeLib');



passport.use(
        new GoogleStrategy({
        clientID: keys.google.clientId,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:3000/login/google/callback'
    }, (accessToken, refreshToken, profile, cb) => {
        let email = profile._json.email;
        UserModel.findOne({email: email}).exec((err, result) => {
            if(err) {
                logger.error(`${err}`, "Passport MiddleWare: Passport callback: FindUser", "high");
            } else if(check.isEmpty(result)) {
                const newUser = new UserModel({
                    userId: shortid.generate(),
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    fullName: `${req.body.firstName} ${req.body.lastName}`,
                    email: email,
                    mobileNumber: '',
                    createdOn: time.now()
                });

                newUser.save((err, result) => {
                    if(err) {
                        logger.error(`${err}`, "Passport MiddleWare: Passport callback: SaveUser", "high");
                    } else {
                        logger.info("User created successfully", "Passport MiddleWare: Passport callback: SaveUser", "successful");
                        cb(null, newUser);
                    }
                })

            } else {
                logger.info("User already exists", "Passport MiddleWare: Passport callback: FindUser", "successful");
                cb(null, result);
            }
        });
    }))