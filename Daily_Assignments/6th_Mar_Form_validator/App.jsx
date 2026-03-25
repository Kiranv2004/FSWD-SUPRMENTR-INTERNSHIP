import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  // Dark mode state - load from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Update localStorage when dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Dark Mode Toggle Button */}
      <button 
        className="theme-toggle-btn" 
        onClick={() => setIsDarkMode(!isDarkMode)}
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Header */}
      <header className="header">
        <h1>Registration Form</h1>
        <p>Fill in your details to create an account</p>
      </header>

      {/* Form Component */}
      <main className="main-content">
        <Form isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Form Validator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
