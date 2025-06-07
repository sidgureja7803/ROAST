import React, { useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import RoastForm from '../components/RoastForm';
import RoastDisplay from '../components/RoastDisplay';
import useRoast from '../hooks/useRoast';
import { FaFire, FaArrowRight, FaClipboard, FaDownload } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { roastLevels, loading, error, result, submitRoast, clearResult } = useRoast();
  
  // Refs for GSAP animations
  const headerRef = useRef(null);
  const flameRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);
  const stepsRef = useRef(null);
  const stepsItemsRef = useRef([]);

  // Set up ref for step items
  const setStepRef = (el, index) => {
    if (el) {
      stepsItemsRef.current[index] = el;
    }
  };

  // Handle form submission
  const handleSubmit = async (text, roastLevel) => {
    try {
      const result = await submitRoast(text, roastLevel);
      if (result) {
        toast.success('Roast generated successfully!', {
          icon: '🔥',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        
        // Animate result appearance
        gsap.fromTo(
          '#result-container',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }
    } catch (err) {
      toast.error('Failed to generate roast');
    }
  };

  // Handle reset
  const handleReset = () => {
    clearResult();
    
    // Re-animate the form when it reappears
    setTimeout(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }
    }, 100);
  };

  // Show error toast if there's an error
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // GSAP animations
  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    // Header animations
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    // Flame animation
    tl.fromTo(
      flameRef.current,
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' },
      '-=0.5'
    );
    
    // Subtitle animation
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );
    
    // Form animation
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
    
    // Continuous flame animation
    gsap.to(flameRef.current, {
      y: -5,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'sine.inOut'
    });
    
    // Create scroll animations for the steps
    if (stepsRef.current && stepsItemsRef.current.length) {
      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(stepsRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: 'power3.out'
          });
          
          // Animate each step with stagger
          gsap.fromTo(
            stepsItemsRef.current,
            { opacity: 0, x: -30 },
            { 
              opacity: 1, 
              x: 0, 
              stagger: 0.2, 
              duration: 0.8, 
              ease: 'power3.out'
            }
          );
        },
        once: true
      });
    }

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,69,0,0.1),transparent_40%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)'
            },
            success: {
              iconTheme: {
                primary: '#FF4500',
                secondary: '#FFFFFF'
              }
            }
          }}
        />
        
        <header ref={headerRef} className="text-center mb-20 relative">
          <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="relative">
            <div className="flex justify-center items-center space-x-6 mb-8">
              <h1 className="text-7xl font-black font-display drop-shadow-sm">
                Resume Roaster
              </h1>
              <div ref={flameRef} className="relative">
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl animate-pulse"></div>
                <FaFire className="text-6xl text-accent relative z-10 drop-shadow-lg" />
              </div>
            </div>
            <p ref={textRef} className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Upload your resume or project description and get it 
              <span className="relative inline-block mx-2">
                <span className="relative z-10 font-bold text-primary">brutally</span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-primary/20 -z-10 transform -rotate-2"></span>
              </span> 
              but 
              <span className="relative inline-block mx-2">
                <span className="relative z-10 font-bold text-primary">constructively</span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-primary/20 -z-10 transform -rotate-2"></span>
              </span> 
              roasted
            </p>
          </div>
        </header>

        <main>
          {!result ? (
            <div ref={formRef} className="transform transition-all duration-500">
              <RoastForm 
                onSubmit={handleSubmit} 
                roastLevels={roastLevels} 
                loading={loading} 
              />
            </div>
          ) : (
            <div id="result-container">
              <RoastDisplay 
                result={result} 
                onReset={handleReset} 
              />
            </div>
          )}

          {!result && (
            <div 
              ref={stepsRef} 
              className="card glass-effect bg-gradient-to-br from-white to-gray-50 p-10 mt-20 transform opacity-0 translate-y-10"
            >
              <h3 className="text-2xl font-bold mb-10 flex items-center text-gradient">
                <span>How It Works</span>
                <div className="h-1 flex-grow ml-4 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"></div>
              </h3>
              <ol className="space-y-8 text-gray-700">
                {[
                  {
                    title: "Paste your resume or project description",
                    detail: "We accept plain text for the most accurate results"
                  },
                  {
                    title: "Or upload a text file containing your content",
                    detail: "We support .txt, .md, and other text formats"
                  },
                  {
                    title: "Select your desired roast level",
                    detail: "From gentle feedback to brutal honesty"
                  },
                  {
                    title: 'Hit the "Roast It!" button and watch the magic happen',
                    detail: "Our AI will analyze and provide constructive criticism"
                  },
                  {
                    title: "Copy or download your roast to share with friends",
                    detail: "Use the feedback to improve your materials"
                  }
                ].map((step, index) => (
                  <li 
                    key={index}
                    ref={(el) => setStepRef(el, index)}
                    className="flex items-start group"
                  >
                    <div className="flex-shrink-0 bg-gradient-to-br from-primary to-primary-light text-white rounded-full h-10 w-10 flex items-center justify-center mr-5 font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-all duration-300">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-lg group-hover:text-primary transition-colors">{step.title}</p>
                      <p className="text-gray-500 mt-1">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              
              <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10 relative overflow-hidden">
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
                <p className="text-center text-gray-700 relative z-10">
                  Ready to get honest feedback that will actually help you improve?
                  <button className="ml-3 px-5 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 inline-flex items-center">
                    Try it now <FaArrowRight className="ml-2" />
                  </button>
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-40 left-10 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-blob"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-blob animation-delay-2000"></div>
      <div className="fixed top-1/2 right-1/4 w-16 h-16 bg-secondary/10 rounded-full blur-xl animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default Home; 