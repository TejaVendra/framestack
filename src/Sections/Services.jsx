import React, { useEffect, useRef, useState } from 'react';

const Services = () => {
  const headingsRef = useRef(null);
  const service1Ref = useRef(null);
  const service2Ref = useRef(null);
  const service3Ref = useRef(null);
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);

  useEffect(() => {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
        }
      });
    }, { threshold: 0.3 });

    const handleScroll = () => {
      const sections = [service1Ref, service2Ref, service3Ref];
      
      sections.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          if (rect.top <= 0) {
            const scale = Math.max(0.85, 1 - (Math.abs(rect.top) / windowHeight) * 0.15);
            const translateY = Math.min(0, -Math.abs(rect.top) * 0.08);
            const opacity = Math.max(0.3, 1 - (Math.abs(rect.top) / windowHeight) * 0.7);
            ref.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            ref.current.style.filter = `brightness(${opacity})`;
          } else {
            ref.current.style.transform = 'scale(1) translateY(0)';
            ref.current.style.filter = 'brightness(1)';
          }
        }
      });
    };

    if (headingsRef.current) headingObserver.observe(headingsRef.current);
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      headingObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-w-full mt-32 bg-black">
      {/* Enhanced Hero Section */}
      <div 
        ref={headingsRef}
        className="px-8 md:px-20 py-32 relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Heading */}
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="overflow-hidden mb-4">
            <h1 
              className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight transition-all duration-1000 ${
                isHeadingVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{transitionDelay: '0.2s'}}
            >
              From vision to velocity,
            </h1>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 
              className={`text-5xl md:text-7xl lg:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight transition-all duration-1000 ${
                isHeadingVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{transitionDelay: '0.5s'}}
            >
              we are all in one place.
            </h1>
          </div>

          {/* Subtitle */}
          <p 
            className={`text-xl md:text-2xl text-gray-400 max-w-3xl transition-all duration-1000 ${
              isHeadingVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
            style={{transitionDelay: '0.8s'}}
          >
            Transforming ideas into digital experiences that captivate, convert, and inspire.
          </p>

          {/* Decorative line */}
          <div 
            className={`mt-12 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1500 ${
              isHeadingVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{transitionDelay: '1s'}}
          ></div>
        </div>
      </div>

      {/* Services Stack */}
      <div className="relative" style={{height: '300vh'}}>
        {/* Service 1 - Branding */}
        <div 
          ref={service1Ref}
          className="sticky top-0 h-screen flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center px-8 md:px-20 py-12 transition-all duration-500 ease-out origin-top rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="flex flex-col max-w-full md:max-w-[45%] justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-medium">01</span>
            </div>
            <h1 className="font-bold text-4xl md:text-6xl text-white leading-tight">
              Branding<br/>Identity
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Create a trusted, global brand with our expert designs and strategies.
              We help improve your brand's visibility, credibility, and connection
              with customers both online and offline.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-12 h-1 bg-white rounded-full"></div>
              <div className="w-8 h-1 bg-white/50 rounded-full"></div>
              <div className="w-4 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              alt="Branding Identity"
              className="relative h-[35vh] md:h-[50vh] w-full md:w-[35vw] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Service 2 - UI/UX */}
        <div 
          ref={service2Ref}
          className="sticky top-0 h-screen flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center px-8 md:px-20 py-12 transition-all duration-500 ease-out origin-top rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="flex flex-col max-w-full md:max-w-[45%] justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-medium">02</span>
            </div>
            <h1 className="font-bold text-4xl md:text-6xl text-white leading-tight">
              UI UX<br/>Design
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Turn your ideas into designs that help business growth. Our UI/UX
              services create easy-to-use, eye-catching digital experiences that
              keep users engaged and improve satisfaction.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-12 h-1 bg-white rounded-full"></div>
              <div className="w-8 h-1 bg-white/50 rounded-full"></div>
              <div className="w-4 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80"
              alt="UI UX Design"
              className="relative h-[35vh] md:h-[50vh] w-full md:w-[35vw] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Service 3 - Website */}
        <div 
          ref={service3Ref}
          className="sticky top-0 h-screen flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center px-8 md:px-20 py-12 transition-all duration-500 ease-out origin-top rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="flex flex-col max-w-full md:max-w-[45%] justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-medium">03</span>
            </div>
            <h1 className="font-bold text-4xl md:text-6xl text-white leading-tight">
              Website<br/>Design
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Get a website that looks great and drives real results. With
              responsive, user-friendly design, your site will engage visitors,
              boost conversions, and enhance your brand's online presence.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-12 h-1 bg-white rounded-full"></div>
              <div className="w-8 h-1 bg-white/50 rounded-full"></div>
              <div className="w-4 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80"
              alt="Website Design"
              className="relative h-[35vh] md:h-[50vh] w-full md:w-[35vw] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Services;