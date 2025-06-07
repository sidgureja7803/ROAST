import React, { useRef, useEffect } from 'react';
import { FaDownload, FaCopy, FaFire, FaRedo } from 'react-icons/fa';
import gsap from 'gsap';

const RoastDisplay = ({ result, onReset }) => {
  const roastTextRef = useRef(null);
  const containerRef = useRef(null);
  const actionsRef = useRef(null);

  // If no result, don't render anything
  if (!result) return null;

  // GSAP animations
  useEffect(() => {
    // Animate the container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate the text with a typewriter effect
    const text = roastTextRef.current;
    gsap.fromTo(
      text,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
    );

    // Animate the action buttons
    gsap.fromTo(
      actionsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, delay: 0.6, ease: 'back.out(1.7)' }
    );
  }, []);

  // Handle copy to clipboard
  const handleCopy = () => {
    if (!roastTextRef.current) return;
    
    const text = roastTextRef.current.innerText;
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show success animation
        gsap.to(roastTextRef.current, {
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderColor: 'rgba(34, 197, 94, 0.3)',
          duration: 0.3,
          yoyo: true,
          repeat: 1
        });
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
    
    // Show success animation
    gsap.fromTo(
      actionsRef.current.children[1],
      { scale: 1 },
      { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.out' }
    );
  };

  // Get level-specific colors
  const getLevelColors = () => {
    switch (result.level) {
      case 'MILD':
        return 'from-green-500 to-green-400';
      case 'SPICY':
        return 'from-yellow-500 to-orange-400';
      case 'EXTRA_BURN':
        return 'from-red-500 to-rose-400';
      default:
        return 'from-primary to-primary-light';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="card mb-8 border-2 border-primary/20 backdrop-blur-sm bg-white/90 shadow-xl relative overflow-hidden"
    >
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-2xl font-bold text-gradient">Your Roast Results</h3>
          <div className={`bg-gradient-to-r ${getLevelColors()} text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 shadow-md`}>
            <span className="font-medium">{result.levelName}</span>
            <FaFire className="text-white" />
          </div>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium transition-colors duration-200 group"
        >
          <FaRedo className="text-primary group-hover:rotate-180 transition-transform duration-500" />
          <span>New Roast</span>
        </button>
      </div>

      <div 
        ref={roastTextRef}
        className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl mb-6 whitespace-pre-wrap text-gray-800 border border-gray-100 shadow-inner leading-relaxed overflow-hidden"
      >
        {result.roasted}
      </div>

      <div ref={actionsRef} className="flex justify-end space-x-4">
        <button
          onClick={handleCopy}
          className="btn btn-outline flex items-center space-x-2 shadow-md hover:translate-y-[-2px] transition-all"
        >
          <FaCopy />
          <span>Copy</span>
        </button>
        <button
          onClick={handleDownload}
          className="btn btn-primary flex items-center space-x-2 shadow-lg hover:translate-y-[-2px] transition-all"
        >
          <FaDownload />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default RoastDisplay; 