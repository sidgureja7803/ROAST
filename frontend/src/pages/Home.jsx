import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import RoastForm from '../components/RoastForm';
import RoastDisplay from '../components/RoastDisplay';
import useRoast from '../hooks/useRoast';
import { FaFire, FaArrowRight, FaClipboard, FaDownload } from 'react-icons/fa';

const Home = () => {
  const { roastLevels, loading, error, result, submitRoast, clearResult } = useRoast();

  // Handle form submission
  const handleSubmit = async (text, roastLevel) => {
    try {
      const result = await submitRoast(text, roastLevel);
      if (result) {
        toast.success('Roast generated successfully!');
      }
    } catch (err) {
      toast.error('Failed to generate roast');
    }
  };

  // Handle reset
  const handleReset = () => {
    clearResult();
  };

  // Show error toast if there's an error
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            border: '1px solid #444'
          },
          success: {
            iconTheme: {
              primary: '#FF4500',
              secondary: '#FFFFFF'
            }
          }
        }}
      />
      
      <header className="text-center mb-16 relative">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="relative">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <h1 className="text-6xl font-bold font-display">Resume Roaster</h1>
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
              <FaFire className="text-5xl text-accent relative z-10" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your resume or project description and get it <span className="font-semibold text-primary">brutally</span> but <span className="font-semibold text-primary">constructively</span> roasted
          </p>
        </div>
      </header>

      <main>
        {!result && (
          <RoastForm 
            onSubmit={handleSubmit} 
            roastLevels={roastLevels} 
            loading={loading} 
          />
        )}

        {result && (
          <RoastDisplay 
            result={result} 
            onReset={handleReset} 
          />
        )}

        {!result && (
          <div className="card bg-gradient-to-br from-gray-50 to-gray-100 p-8 mt-12 glass-effect">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gradient">
              <span>How It Works</span>
              <div className="h-1 flex-grow ml-4 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"></div>
            </h3>
            <ol className="space-y-6 text-gray-700">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-4 font-bold">1</div>
                <div>
                  <p className="font-medium">Paste your resume or project description in the text area</p>
                  <p className="text-sm text-gray-500 mt-1">We accept plain text for the most accurate results</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-4 font-bold">2</div>
                <div>
                  <p className="font-medium">Or upload a text file containing your content</p>
                  <p className="text-sm text-gray-500 mt-1">We support .txt, .md, and other text formats</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-4 font-bold">3</div>
                <div>
                  <p className="font-medium">Select your desired roast level</p>
                  <p className="text-sm text-gray-500 mt-1">From gentle feedback to brutal honesty</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-4 font-bold">4</div>
                <div>
                  <p className="font-medium">Hit the "Roast It!" button and watch the magic happen</p>
                  <p className="text-sm text-gray-500 mt-1">Our AI will analyze and provide constructive criticism</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-4 font-bold">5</div>
                <div>
                  <p className="font-medium">Copy or download your roast to share with friends</p>
                  <p className="text-sm text-gray-500 mt-1">Use the feedback to improve your materials</p>
                </div>
              </li>
            </ol>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-center text-sm text-gray-600">
                Ready to get honest feedback that will actually help you improve?
                <button className="ml-2 text-primary font-medium hover:underline inline-flex items-center">
                  Try it now <FaArrowRight className="ml-1" />
                </button>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home; 