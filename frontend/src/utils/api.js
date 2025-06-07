import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const roastAPI = {
  // Get all available roast levels
  getRoastLevels: async () => {
    try {
      const response = await api.get('/roast/levels');
      return response.data;
    } catch (error) {
      console.error('Error fetching roast levels:', error);
      throw error;
    }
  },
  
  // Submit text for roasting
  createRoast: async (text, roastLevel) => {
    try {
      const response = await api.post('/roast', { text, roastLevel });
      return response.data;
    } catch (error) {
      console.error('Error creating roast:', error);
      throw error;
    }
  },
};

export default api; 