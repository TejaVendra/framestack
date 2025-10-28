// EmailReminderPopup.jsx
import { useState, useEffect } from 'react';
import '../styles/EmailReminderPopup.css';

const EmailReminderPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const dismissed = localStorage.getItem('emailWorkingReminderDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show popup only once after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Auto-save to localStorage when closed
    localStorage.setItem('emailWorkingReminderDismissed', 'true');
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('emailWorkingReminderDismissed', 'true');
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="pop-alert-backdrop" onClick={handleClose}>
      <div className="pop-alert-card pop-alert-email-reminder" onClick={(e) => e.stopPropagation()}>
        
        <div className="pop-alert-header">
          <div className="pop-alert-icon-box pop-alert-warning-icon">
            <svg className="pop-alert-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <button className="pop-alert-close-btn" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="pop-alert-body">
          <h2 className="pop-alert-title">Use a Working Email Address</h2>
          <p className="pop-alert-text">
            Make sure to register with a <span className="pop-alert-highlight">valid and active email</span>. 
            All updates, notifications, and important information will be sent to this email only.
          </p>
          <div className="pop-alert-info-box">
            <svg className="pop-alert-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You won't be able to receive updates if your email is incorrect</span>
          </div>
        </div>

        <div className="pop-alert-footer">
          <button className="pop-alert-btn pop-alert-btn-primary" onClick={handleClose}>
            I Understand
          </button>
          <button className="pop-alert-btn pop-alert-btn-ghost" onClick={handleDontShowAgain}>
            Don't show again
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmailReminderPopup;