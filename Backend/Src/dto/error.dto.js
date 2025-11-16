const errorResponse = (res, error) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    data: error.data || null,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

module.exports = { errorResponse };