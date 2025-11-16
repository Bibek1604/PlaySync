const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');
const connectDB = require('./config/db');
const rateLimiter = require('./middlewares/rateLimiter.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');
const v1Routes = require('./routes/v1.js');
const specs = require('./docs/swagger');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined', { stream: logger.stream }));
app.use(rateLimiter);

// Routes
app.use('/api/v1', v1Routes);

// Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Global Error Handler (MUST BE LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Docs: http://localhost:${PORT}/docs`);
});
