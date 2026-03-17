import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/MoodDisplay.css';
import { getMoodById, getRandomMessage } from '../utils/moods';

const MoodDisplay = ({ selectedMood }) => {
  const mood = getMoodById(selectedMood);
  const message = getRandomMessage(selectedMood);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedMood}
        className="mood-display"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <motion.div className="mood-content" variants={itemVariants}>
          <motion.div
            className="mood-emoji-large"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {mood.emoji}
          </motion.div>

          <motion.h2 className="mood-name" variants={itemVariants}>
            {mood.label}
          </motion.h2>

          <motion.p className="mood-message" variants={itemVariants}>
            {message}
          </motion.p>

          <motion.div
            className="mood-stats"
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="stat-item">
              <span className="stat-icon">✨</span>
              <span className="stat-text">Track your emotions</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💭</span>
              <span className="stat-text">Reflect & grow</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🌟</span>
              <span className="stat-text">Find peace</span>
            </div>
          </motion.div>

          <motion.div
            className="mood-color-indicator"
            style={{
              background: mood.gradient,
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodDisplay;
