import React from 'react';
import ButtomTransition from "./ButtomTransitions.jsx"
const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="NotFoundContainer">
        <div className="glitch-wrapper">
          <div className="glitch" data-text="404">404</div>
        </div>
        
        <div className="error-message">
          <h2>Page Not Found</h2>
          <p>The page you're looking for has wandered into the void.</p>
        </div>

        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <button className="home-button" onClick={() => window.location.href = '/'}>
          <span className="button-text">Return Home</span>
          <span className="button-icon">→</span>
        </button>

        <div className="scan-line"></div>
      </div>
    </div>
  );
};

const WrappedTopTransition = ButtomTransition(NotFound)
export default WrappedTopTransition;