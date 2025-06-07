import React, { useState } from 'react';
import { FaFileUpload, FaTrash, FaFire } from 'react-icons/fa';
import RoastLevelSelector from './RoastLevelSelector';

const RoastForm = ({ onSubmit, roastLevels, loading }) => {
  const [text, setText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [fileName, setFileName] = useState('');

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    // Read file content as text
    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result);
    };
    reader.readAsText(file);
  };

  // Clear the form
  const handleClear = () => {
    setText('');
    setFileName('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !selectedLevel) return;
    onSubmit(text, selectedLevel);
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-8 backdrop-blur-sm">
      <div className="mb-8">
        <label htmlFor="resume-text" className="block text-xl font-semibold mb-3 text-gradient">
          Paste Resume/Project Text
        </label>
        <div className="relative">
          <textarea
            id="resume-text"
            className="textarea min-h-[250px] focus:shadow-lg transition-shadow"
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your resume or project description here for a proper roasting..."
            disabled={loading}
          />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-br-xl opacity-20"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label
            htmlFor="file-upload"
            className="btn btn-outline flex items-center space-x-2 cursor-pointer"
          >
            <FaFileUpload />
            <span>Upload File</span>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.md,.text"
              className="hidden"
              onChange={handleFileUpload}
              disabled={loading}
            />
          </label>
          {fileName && (
            <div className="text-sm glass-effect p-2 px-4 rounded-full flex items-center space-x-2">
              <span className="font-medium">Uploaded: {fileName}</span>
              <button
                type="button"
                onClick={handleClear}
                className="text-red-500 hover:text-red-700 p-1 hover:bg-red-100 rounded-full transition-colors"
                disabled={loading}
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <RoastLevelSelector
          levels={roastLevels}
          selectedLevel={selectedLevel}
          onSelectLevel={setSelectedLevel}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full flex items-center justify-center space-x-3"
        disabled={!text || !selectedLevel || loading}
      >
        {loading ? (
          <span className="flex items-center space-x-3">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Roasting in progress...</span>
          </span>
        ) : (
          <span className="flex items-center space-x-3">
            <FaFire className="text-white text-xl" />
            <span className="font-bold">Roast It!</span>
          </span>
        )}
      </button>
    </form>
  );
};

export default RoastForm; 