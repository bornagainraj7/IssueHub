const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const secretKey = '8)m3Ve12y1r4nd0mP455w012d'; //someveryrandomPassword
const logger = require('tracer').colorConsole();


let generateToken = (data, cb) => {
    let fullName = data.firstName+" "+data.lastName;
    try {
        let claims = {
            jwtid: shortid.generate(),
            issuedAt: Date.now(),
            sub: 'authToken',
            userId: data.userId,
            email: data.email,
            fullName: fullName,
            mobileNumber: data.mobileNumber
        }
        let expiry = {
            expiresIn: "24h",
        }
        let tokenDetails = {
            authToken: jwt.sign(claims, secretKey, expiry),
            tokenSecret: secretKey
        }
        cb(null, tokenDetails);
    } catch (err) {
        cb(err, null);
    }
}

let verifyToken = (token, secretKey, cb) => {
    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            logger.error(err);
            cb(err, null);
        } else {
            // logger.info("Token verified successfully", "TokenLib: verifyClaim()", 'successful');
            cb(null, decoded);
            
        }
    });
}

let verifyWithoutSecret = (token, cb) => {
    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            logger.error(err);
            cb(err, null);
        } else {
            // logger.info("Token verified successfully", "TokenLib: verifyClaim()", 'successful');
            cb(null, decoded);
        }
    });
}


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    verifyWithoutSecret: verifyWithoutSecret
}