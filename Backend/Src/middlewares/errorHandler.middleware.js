const AppError = require('../utils/AppError');
const { errorResponse } = require('../dto/error.dto');
const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  // If this is an operational error we created, respond with the message
  if (err.isOperational) {
    logger.warn({ message: err.message, statusCode: err.statusCode, path: req.originalUrl });
    return errorResponse(res, err);
  }

  // Handle MongoDB errors
  if (err.name === 'CastError') {
    const appErr = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
    logger.warn({ message: appErr.message, originalError: err });
    return errorResponse(res, appErr);
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const appErr = new AppError(`Duplicate ${field}: ${err.keyValue[field]}`, 400);
    logger.warn({ message: appErr.message, originalError: err });
    return errorResponse(res, appErr);
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    const appErr = new AppError(messages.join(', '), 400);
    logger.warn({ message: appErr.message, originalError: err });
    return errorResponse(res, appErr);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const appErr = new AppError('Invalid token', 401);
    logger.warn({ message: appErr.message, originalError: err });
    return errorResponse(res, appErr);
  }
  if (err.name === 'TokenExpiredError') {
    const appErr = new AppError('Token expired', 401);
    logger.warn({ message: appErr.message, originalError: err });
    return errorResponse(res, appErr);
  }

  // Unknown / programming error: log full details and return generic message
  logger.error('UNHANDLED ERROR', { error: err, path: req.originalUrl, method: req.method });
  errorResponse(res, new AppError('Something went wrong!', 500));
};