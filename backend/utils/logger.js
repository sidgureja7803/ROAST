const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// Create logger instance
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ 
      filename: path.join(logDir, 'roast-logs.txt') 
    }),
  ],
});

// Log roast request
const logRoastRequest = (text, roastLevel, responseLength) => {
  const truncatedText = text.length > 50 
    ? `${text.substring(0, 50)}...` 
    : text;
    
  logger.info(`Roast Request | Level: ${roastLevel} | Text: ${truncatedText} | Response length: ${responseLength}`);
};

module.exports = { logger, logRoastRequest }; 