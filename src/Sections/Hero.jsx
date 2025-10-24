import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
const Hero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const nav = useNavigate();
  const onhandlehero = ()=>{
    nav('/login')
  }

  useEffect(() => {
    // Trigger animations after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMove = (e) => {
      const el = heroRef.current;
      if (!el) return;
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 60;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-8 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)'
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs with initial animation */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: 'float 20s ease-in-out infinite, orb-entry 1.5s ease-out',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: 'float-delayed 25s ease-in-out infinite, orb-entry 1.5s ease-out 0.3s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)'
          }}
        ></div>
        <div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl transition-all duration-1000"
          style={{
            animation: 'float-slow 30s ease-in-out infinite, orb-entry 1.5s ease-out 0.6s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)'
          }}
        ></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 transition-opacity duration-1500"
          style={{
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'center center',
            opacity: isVisible ? 0.1 : 0
          }}
        ></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full transition-opacity duration-1000"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: isVisible ? 0.3 : 0,
              transitionDelay: `${i * 0.05}s`
            }}
          ></div>
        ))}

        {/* Gradient Lines */}
        <div 
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-1000"
          style={{
            animation: 'scan 8s linear infinite',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transition-opacity duration-1000"
          style={{
            animation: 'scan-vertical 10s linear infinite',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.7s'
          }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl px-6">
        {/* Badge */}
        <div 
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 group cursor-pointer">
            <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse">
              NEW
            </span>
            <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
              Meet Design Pages
            </span>
            <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Main Heading with Gradient */}
        <div className="mb-12 space-y-2">
          <div className="overflow-hidden">
            <h1 
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #e0e0e0 50%, #fff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transitionDelay: '0.2s'
              }}
            >
              Build better
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 
              className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transitionDelay: '0.4s'
              }}
            >
              sites, faster
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto space-y-2 mb-12">
          <p 
            className={`text-xl md:text-2xl lg:text-3xl text-gray-400 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{transitionDelay: '0.6s'}}
          >
            <span className="text-white font-semibold">FrameStack</span> is the design tool for websites.
          </p>
          <p 
            className={`text-xl md:text-2xl lg:text-3xl text-gray-400 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{transitionDelay: '0.8s'}}
          >
            Design freely, publish fast, and scale
          </p>
          <p 
            className={`text-xl md:text-2xl lg:text-3xl text-gray-400 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{transitionDelay: '1s'}}
          >
            with CMS, SEO, analytics, and more.
          </p>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{transitionDelay: '1.2s'}}
        >
          <button onClick={onhandlehero} className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white text-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Get Started Free</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </button>
          
        
        </div>

        {/* Stats */}
        <div 
          className={`mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{transitionDelay: '1.4s'}}
        >
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10</div>
            <div className="text-sm text-gray-500 mt-1">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50</div>
            <div className="text-sm text-gray-500 mt-1">Websites Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">99.9%</div>
            <div className="text-sm text-gray-500 mt-1">Uptime</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orb-entry {
          0% { 
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          100% { 
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes float-particle {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        .animate-scan-vertical {
          animation: scan-vertical 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;