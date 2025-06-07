import React from 'react';
import { FaFire } from 'react-icons/fa';

const RoastLevelSelector = ({ levels, selectedLevel, onSelectLevel }) => {
  // If no levels are loaded yet, show loading placeholder
  if (!levels || levels.length === 0) {
    return (
      <div className="flex flex-col space-y-4 mb-6 animate-pulse">
        <h3 className="text-xl font-semibold text-gradient">Select Roast Level</h3>
        <div className="flex space-x-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 w-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Helper function to determine the number of fire icons based on level
  const getFireIcons = (levelId) => {
    switch (levelId) {
      case 'MILD':
        return 1;
      case 'SPICY':
        return 2;
      case 'EXTRA_BURN':
        return 3;
      default:
        return 0;
    }
  };

  // Get level-specific styles
  const getLevelStyles = (levelId) => {
    switch (levelId) {
      case 'MILD':
        return {
          gradient: 'from-blue-500 to-cyan-400',
          shadow: 'shadow-blue-500/30',
          border: 'border-blue-200',
          hoverBg: 'hover:bg-blue-50'
        };
      case 'SPICY':
        return {
          gradient: 'from-orange-500 to-amber-500',
          shadow: 'shadow-orange-500/30',
          border: 'border-orange-200',
          hoverBg: 'hover:bg-orange-50'
        };
      case 'EXTRA_BURN':
        return {
          gradient: 'from-red-600 to-pink-500',
          shadow: 'shadow-red-500/30',
          border: 'border-red-200',
          hoverBg: 'hover:bg-red-50'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-400',
          shadow: 'shadow-gray-500/30',
          border: 'border-gray-200',
          hoverBg: 'hover:bg-gray-50'
        };
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <h3 className="text-xl font-semibold text-gradient flex items-center">
        <span>Select Roast Level</span>
        <div className="ml-3 h-px flex-grow bg-gradient-to-r from-primary/40 to-transparent rounded-full"></div>
      </h3>
      
      <div className="flex flex-wrap gap-4">
        {levels.map((level) => {
          const styles = getLevelStyles(level.id);
          return (
            <button
              key={level.id}
              className={`relative overflow-hidden flex items-center justify-between px-5 py-3 rounded-xl transition-all duration-300 ${
                selectedLevel === level.id
                  ? `bg-gradient-to-r ${styles.gradient} text-white ${styles.shadow} scale-105`
                  : `bg-white ${styles.border} border ${styles.hoverBg} hover:border-primary hover:text-primary`
              }`}
              onClick={() => onSelectLevel(level.id)}
              title={level.description}
            >
              <span className="font-medium text-lg">{level.name}</span>
              <span className="flex ml-3 space-x-1">
                {[...Array(getFireIcons(level.id))].map((_, i) => (
                  <FaFire 
                    key={i} 
                    className={`${
                      selectedLevel === level.id 
                        ? 'text-white animate-pulse' 
                        : 'text-primary'
                    }`} 
                  />
                ))}
              </span>
              {selectedLevel === level.id && (
                <span className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/20 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-sm text-gray-500 mt-2 italic">
        Select the intensity of feedback you'd like to receive
      </div>
    </div>
  );
};

export default RoastLevelSelector; 