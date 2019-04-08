const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');


let errorHandler = (err, req, res, next) => {
    logger.error(`${err}`, "Global Error Handler", "high");
    let apiResponse = response.generate(true, 'Some error occured at global level',500, null);
    res.send(apiResponse);
    
}// end request ip logger function 

let notFoundHandler = (req,res,next)=>{
    logger.error("Route not found, please check...", "Global Not Found Handler", "med");
    let apiResponse = response.generate(true, 'Route not found in the application',404, null);
    res.status(404).send(apiResponse);

}// end not found handler

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}
