const { generateRoast } = require('../services/geminiService');
const { logRoastRequest } = require('../utils/logger');
const roastLevels = require('../config/roastLevels');

/**
 * Get available roast levels
 * @route GET /api/roast/levels
 */
const getRoastLevels = (req, res) => {
  try {
    const levels = Object.keys(roastLevels).map(key => ({
      id: key,
      name: roastLevels[key].name,
      description: roastLevels[key].description
    }));
    
    res.json({
      success: true,
      data: levels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Generate a roast based on input text and level
 * @route POST /api/roast
 */
const createRoast = async (req, res) => {
  try {
    const { text, roastLevel } = req.body;
    
    // Generate roast using Gemini API
    const roastedText = await generateRoast(text, roastLevel);
    
    // Log the request
    logRoastRequest(text, roastLevel, roastedText.length);
    
    res.json({
      success: true,
      data: {
        original: text,
        roasted: roastedText,
        level: roastLevel,
        levelName: roastLevels[roastLevel].name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getRoastLevels,
  createRoast
}; 