import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Refs for GSAP animations
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const sectionsRef = useRef([]);

  // GSAP animations
  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    // Header animations
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    // Create scroll animations for sections
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { 
          opacity: 0, 
          y: 30, 
          scale: 0.95
        },
        { 
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out'
        }
      );
    });

    // Clean up animations
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation for the fire icons
  useEffect(() => {
    const fireIcons = document.querySelectorAll('.fire-icon');
    
    fireIcons.forEach(icon => {
      gsap.to(icon, {
        y: -3,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-gray-100">
      <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,69,0,0.08),transparent_50%)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-primary hover:text-primary-dark mb-12"
        >
          <FaArrowLeft className="text-sm" />
          <span className="font-medium">Back to Home</span>
        </Link>
        
        <header ref={headerRef} className="text-center mb-16 relative">
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-60"></div>
          <div className="relative">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <h1 className="text-6xl font-black font-display drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                About Resume Roaster
              </h1>
              <FaFire className="text-4xl text-accent fire-icon" />
            </div>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Where your resume meets its <span className="font-semibold text-primary">worst nightmare</span>
            </p>
          </div>
        </header>

        <main ref={mainRef} className="space-y-12">
          <section 
            ref={el => sectionsRef.current[0] = el} 
            className="card glass-effect bg-gradient-to-br from-white to-gray-50 p-8 transform hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <FaInfoCircle className="text-3xl text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gradient">What is Resume Roaster?</h2>
            </div>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Resume Roaster is a fun tool that uses AI to provide humorous, sarcastic feedback on your resume or project descriptions. 
              Whether you're looking for a laugh or some brutally honest feedback wrapped in humor, our roasts can help you see your 
              professional content from a different perspective.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Powered by Google's Gemini AI, our roasts range from mild constructive criticism to scorching burns that will make you 
              question your career choices (in the most entertaining way possible).
            </p>
          </section>

          <section 
            ref={el => sectionsRef.current[1] = el} 
            className="card glass-effect bg-gradient-to-br from-white to-gray-50 p-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-gradient">Roast Levels</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6 group hover:bg-primary/5 p-4 rounded-xl transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <FaFire className="text-3xl text-green-500 fire-icon" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-600 mb-2 group-hover:translate-x-1 transition-transform duration-300">Mild Roast</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A gentle critique with constructive feedback. We'll point out areas for improvement while being somewhat nice about it.
                    Perfect for those who want helpful feedback with just a touch of sarcasm.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 group hover:bg-primary/5 p-4 rounded-xl transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <div className="flex space-x-1">
                      <FaFire className="text-3xl text-yellow-500 fire-icon" />
                      <FaFire className="text-3xl text-yellow-500 fire-icon" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-600 mb-2 group-hover:translate-x-1 transition-transform duration-300">Spicy Roast</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A stronger critique with sharp humor. We'll be more direct about the flaws in your content, 
                    with creative analogies and references that might make you laugh... or cry.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6 group hover:bg-primary/5 p-4 rounded-xl transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <div className="flex space-x-1">
                      <FaFire className="text-3xl text-red-500 fire-icon" />
                      <FaFire className="text-3xl text-red-500 fire-icon" />
                      <FaFire className="text-3xl text-red-500 fire-icon" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-red-600 mb-2 group-hover:translate-x-1 transition-transform duration-300">Extra Burn</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A scorching critique with no mercy. We'll pull out all the stops for a comedic takedown of your content.
                    Expect exaggerated flaws, pop culture references, and maybe one tiny constructive suggestion buried in mockery.
                    Not for the faint of heart!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section 
            ref={el => sectionsRef.current[2] = el} 
            className="card glass-effect bg-gradient-to-br from-white to-gray-50 p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
            <h2 className="text-3xl font-bold mb-6 text-gradient">Disclaimer</h2>
            <p className="text-gray-700 text-lg leading-relaxed relative z-10">
              Resume Roaster is meant for entertainment purposes. The roasts are generated by AI and should be taken with a grain of salt.
              While they might contain useful feedback, they're primarily designed to make you laugh. 
              We're not responsible for any existential crises that may result from our roasts.
            </p>
          </section>
        </main>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-60 left-20 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-blob"></div>
      <div className="fixed bottom-40 right-20 w-28 h-28 bg-accent/20 rounded-full blur-xl animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default About; 