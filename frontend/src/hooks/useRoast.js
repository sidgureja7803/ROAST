import { useState, useEffect } from 'react';
import { roastAPI } from '../utils/api';

const useRoast = () => {
  const [roastLevels, setRoastLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Fetch available roast levels on mount
  useEffect(() => {
    const fetchRoastLevels = async () => {
      try {
        setLoading(true);
        const response = await roastAPI.getRoastLevels();
        if (response.success) {
          setRoastLevels(response.data);
        } else {
          setError('Failed to fetch roast levels');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch roast levels');
      } finally {
        setLoading(false);
      }
    };

    fetchRoastLevels();
  }, []);

  // Submit text for roasting
  const submitRoast = async (text, roastLevel) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      const response = await roastAPI.createRoast(text, roastLevel);
      if (response.success) {
        setResult(response.data);
        return response.data;
      } else {
        setError('Failed to generate roast');
        return null;
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to generate roast';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Clear the current result
  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return {
    roastLevels,
    loading,
    error,
    result,
    submitRoast,
    clearResult,
  };
};

export default useRoast; 