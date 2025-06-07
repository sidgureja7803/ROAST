const { GoogleGenerativeAI } = require('@google/generative-ai');
const roastLevels = require('../config/roastLevels');
const { logger } = require('../utils/logger');

// Initialize Gemini API
const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generate roast based on input text and roast level
 * @param {string} text - Resume or project text to roast
 * @param {string} roastLevel - Roast intensity level (MILD, SPICY, EXTRA_BURN)
 * @returns {Promise<string>} - Roasted text response
 */
const generateRoast = async (text, roastLevel) => {
  try {
    const genAI = initGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Get the appropriate prompt template based on roast level
    const levelConfig = roastLevels[roastLevel];
    if (!levelConfig) {
      throw new Error(`Invalid roast level: ${roastLevel}`);
    }
    
    // Replace placeholder with actual text
    const prompt = levelConfig.promptTemplate.replace('{text}', text);
    
    logger.info(`Sending request to Gemini API with roast level: ${roastLevel}`);
    
    // Generate response from Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();
    
    return responseText;
  } catch (error) {
    logger.error(`Error generating roast: ${error.message}`);
    throw new Error(`Failed to generate roast: ${error.message}`);
  }
};

module.exports = { generateRoast }; 