import React, { useRef } from 'react';
import { FaDownload, FaCopy, FaFire } from 'react-icons/fa';

const RoastDisplay = ({ result, onReset }) => {
  const roastTextRef = useRef(null);

  // If no result, don't render anything
  if (!result) return null;

  // Handle copy to clipboard
  const handleCopy = () => {
    if (!roastTextRef.current) return;
    
    const text = roastTextRef.current.innerText;
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  // Handle download as text file
  const handleDownload = () => {
    if (!roastTextRef.current) return;
    
    const text = roastTextRef.current.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-roast-${result.level.toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card mb-6 border-2 border-primary">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-bold">Your Roast Results</h3>
          <div className="bg-primary text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
            <span>{result.levelName}</span>
            <FaFire />
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-primary"
        >
          New Roast
        </button>
      </div>

      <div 
        ref={roastTextRef}
        className="bg-gray-50 p-4 rounded-md mb-4 whitespace-pre-wrap text-gray-800"
      >
        {result.roasted}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={handleCopy}
          className="btn btn-outline flex items-center space-x-2"
        >
          <FaCopy />
          <span>Copy</span>
        </button>
        <button
          onClick={handleDownload}
          className="btn btn-primary flex items-center space-x-2"
        >
          <FaDownload />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default RoastDisplay; 