const globalErrorHandler = (err, req, res, next) => {
    // Set default status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // You can log errors here if needed
    console.error(err);

    // Return the error response to the client
    res.status(statusCode).json({
        message,
    });
};

module.exports = globalErrorHandler;
