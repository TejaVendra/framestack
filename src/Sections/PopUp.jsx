// PopUp.jsx
import { useState, useEffect } from 'react';
import '../styles/PopUp.css';

const PopUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('emailReminderDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    const interval = setInterval(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 200000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('emailReminderDismissed', 'true');
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="pop-alert-backdrop" onClick={handleClose}>
      <div className="pop-alert-card" onClick={(e) => e.stopPropagation()}>
        
        <div className="pop-alert-header">
          <div className="pop-alert-icon-box">
            <svg className="pop-alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button className="pop-alert-close-btn" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="pop-alert-body">
          <h2 className="pop-alert-title">Check Your Spam Folder</h2>
          <p className="pop-alert-text">
            Not seeing our emails in your inbox? Don't worry! 
            Check your <span className="pop-alert-highlight">spam or junk folder</span> – 
            they might be waiting there for you.
          </p>
        </div>

        <div className="pop-alert-footer">
          <button className="pop-alert-btn pop-alert-btn-primary" onClick={handleClose}>
            Understood
          </button>
          <button className="pop-alert-btn pop-alert-btn-ghost" onClick={handleDontShowAgain}>
            Don't remind me
          </button>
        </div>

      </div>
    </div>
  );
};

export default PopUp;