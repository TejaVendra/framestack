
import React from 'react';
import '../styles/NotFoundPage.css'

const NotFoundPage = () => {
  const goBack = () => {
    window.location.href = "/"
  };

  return (
    <div className="not-found-page">
      {/* Floating decorative elements */}
      <div className="floating-element element-1">❓</div>
      <div className="floating-element element-2">⚠️</div>
      <div className="floating-element element-3">🔍</div>
      <div className="floating-element element-4">🌀</div>

      <div className="not-found-container">
        <div className="cartoon-character">
          <div className="face">
            <div className="eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
            <div className="mouth"></div>
            <div className="tears">
              <div className="tear"></div>
              <div className="tear"></div>
            </div>
          </div>
        </div>
        
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! Page Not Found</h2>
        <p className="error-description">
          Looks like our cartoon friend got lost trying to find this page. 
          It seems to have wandered off into the digital void!
        </p>
        <button className="back-button" onClick={goBack}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;