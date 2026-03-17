import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode, moodHistory }) => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="navbar-title">
            <span className="emoji">🎭</span>
            <span>Mood Tracker</span>
          </h1>
        </div>

        <div className="navbar-right">
          <motion.button
            className="history-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="View mood history"
          >
            📊 {moodHistory.length} moods today
          </motion.button>

          <motion.button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1, rotate: 20 }}
            whileTap={{ scale: 0.95 }}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
