import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles/App.css';
import Navbar from './components/Navbar';
import MoodSelector from './components/MoodSelector';
import MoodDisplay from './components/MoodDisplay';
import Background from './components/Background';
import ParticleEffect from './components/ParticleEffect';

const App = () => {
  const [selectedMood, setSelectedMood] = useState('happy');
  const [darkMode, setDarkMode] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);

  // Load mood history and dark mode from localStorage on mount
  useEffect(() => {
    const savedMoodHistory = localStorage.getItem('moodHistory');
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedTodayDate = localStorage.getItem('todayDate');
    const today = new Date().toDateString();

    if (savedTodayDate !== today) {
      // Reset history if it's a new day
      localStorage.setItem('todayDate', today);
      setMoodHistory([]);
    } else if (savedMoodHistory) {
      setMoodHistory(JSON.parse(savedMoodHistory));
    }

    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save mood history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handle mood selection
  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);

    // Add to mood history
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setMoodHistory((prev) => [
      ...prev,
      { mood: moodId, time: timestamp },
    ]);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Background selectedMood={selectedMood} darkMode={darkMode} />
      <ParticleEffect selectedMood={selectedMood} />

      <div className="app-content">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} moodHistory={moodHistory} />

        <motion.main
          className="main-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="container">
            <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />

            <motion.div className="display-section">
              <MoodDisplay selectedMood={selectedMood} />
            </motion.div>
          </motion.div>
        </motion.main>

        <motion.footer
          className="footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>✨ Track your mood, understand yourself, find peace ✨</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default App;
