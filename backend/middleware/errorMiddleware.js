//This is the error manager file including the error handlers for the server

//error when the object not found
const noFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//Overirde the default express error handler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    console.log(message);
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? '🖥️' : err.stack //Not overwhelme the console with debug error messages
    });
};

export { noFound, errorHandler };
