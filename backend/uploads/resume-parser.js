/**
 * Simple utility to extract text from uploaded files
 * This is a placeholder for a more robust parser that could handle PDFs, DOCs, etc.
 */

const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/logger');

/**
 * Extract text from a file
 * Currently only supports text files
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromFile = async (filePath) => {
  try {
    // For now, we'll just read the file as text
    // In a production app, you would use libraries like pdf-parse or docx
    const text = fs.readFileSync(filePath, 'utf8');
    return text;
  } catch (error) {
    logger.error(`Error extracting text from file: ${error.message}`);
    throw new Error(`Failed to extract text from file: ${error.message}`);
  }
};

module.exports = {
  extractTextFromFile
}; 