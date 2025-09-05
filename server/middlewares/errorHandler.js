// not Found 
// This middleware handles requests to routes that are not defined in your application.
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error Handler
// This middleware handles errors that occur in the application.
const errorHandler = (err,req,res,next)=>{
    const statuscode = res.statusCode==200 ? 500 : res.statusCode;
    res.status(statuscode)
    res.json({
        message:err?.message,
        stack:err?.stack
    })
}
module.exports = {errorHandler,notFound}