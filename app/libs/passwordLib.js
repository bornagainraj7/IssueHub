const bcrypt = require("bcryptjs");
const saltRounds = 10;

/* Custom Library */
let logger = require('tracer').colorConsole();

let hashpassword = myPlaintextPassword => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash;
};


let comparePassword = (password, hashPassword, cb) => {
    bcrypt.compare(password, hashPassword, (err, res) => {
        if (err) {
            logger.error(err);
            cb(err, null);
        } else {
            logger.info("Password match successfully");
            cb(null, res);
        }
    });
};

// let comparePasswordSync = (myPlaintextPassword, hash) => {
//     return bcrypt.compareSync(myPlaintextPassword, hash);
// };
module.exports = {
    hashpassword: hashpassword,
    comparePassword: comparePassword
};
