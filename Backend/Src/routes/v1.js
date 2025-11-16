const express = require('express');
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    data: { time: new Date().toISOString() },
    statusCode: 200
  });
});

module.exports = router;