
import React, { useState, useEffect , } from 'react';
import { useNavigate } from 'react-router';
import '../styles/ServicesPage.css';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const nav = useNavigate()

  const onhandle = () =>{
    nav('/contact')
  }

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites built with cutting-edge technologies for optimal performance and user experience.",
      icon: "🌐",
      features: ["Responsive Design", "SEO Optimization", "Fast Loading", "Cross-Browser Compatibility"],
      tags: ["React", "Next.js", "Vue.js", "Node.js"]
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Beautiful interfaces with intuitive user experiences crafted for maximum engagement.",
      icon: "🎨",
      features: ["User Research", "Wireframing", "Prototyping", "Interaction Design"],
      tags: ["Figma", "Adobe XD", "Sketch", "User Testing"]
    },
    {
      id: 3,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications designed for seamless functionality.",
      icon: "📱",
      features: ["iOS & Android", "React Native", "App Store Optimization", "Push Notifications"],
      tags: ["React Native", "Flutter", "Swift", "Kotlin"]
    },
    {
      id: 4,
      title: "E-Commerce Solutions",
      description: "Complete online store setups with secure payment gateways and inventory management.",
      icon: "🛒",
      features: ["Shopping Cart", "Payment Integration", "Product Management", "Analytics Dashboard"],
      tags: ["Shopify", "WooCommerce", "Stripe", "PayPal"]
    },
    {
      id: 5,
      title: "Brand Identity",
      description: "Comprehensive branding solutions including logos, color schemes, and visual guidelines.",
      icon: "✨",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Materials"],
      tags: ["Branding", "Logo", "Identity", "Strategy"]
    },
    {
      id: 6,
      title: "Digital Marketing",
      description: "Strategic campaigns to boost your online presence and drive customer engagement.",
      icon: "📈",
      features: ["SEO Services", "Social Media", "Content Marketing", "PPC Campaigns"],
      tags: ["SEO", "Social Media", "Analytics", "Campaigns"]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="services-container">
      {/* Cursor Effect */}
      <div 
        className="cursor-trail"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10
        }}
      ></div>

      {/* Enhanced Background Effects */}
      <div className="gradient-bg"></div>
      <div className="blobs-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
      </div>
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className={`particle particle-${i+1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1">✦</div>
        <div className="floating-element element-2">✧</div>
        <div className="floating-element element-3">✦</div>
        <div className="floating-element element-4">✧</div>
      </div>

      <div className="services-content">
        <header className="services-header">
          <div className="header-glow"></div>
          <h1 className="services-title">
            <span className="title-gradient">Our Premium</span>
            <span className="title-animated"> Services</span>
          </h1>
          <p className="services-subtitle">Crafting digital experiences that inspire and engage</p>
          <div className="header-divider"></div>
        </header>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              className={`service-card ${activeService === service.id ? 'active' : ''}`}
              key={service.id}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-glow"></div>
              <div className="service-icon">{service.icon}</div>
              <h2 className="service-name">{service.title}</h2>
              <p className="service-description">{service.description}</p>
              
              <div className="service-features-container">
                <h3 className="features-title">Key Features</h3>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="feature-item"
                      style={{ animationDelay: `${0.1 * featureIndex}s` }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-tags">
                {service.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="tag-item"
                    style={{ animationDelay: `${0.2 * tagIndex}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="services-cta">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Digital Presence?</h2>
            <p className="cta-description">Let's create something amazing together</p>
            <button onClick={onhandle} className="cta-button">
              <span>Start Your Project</span>
              <div className="cta-button-glow"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;