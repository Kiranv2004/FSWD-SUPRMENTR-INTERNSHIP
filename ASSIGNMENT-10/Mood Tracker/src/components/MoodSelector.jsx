import React from 'react';
import { motion } from 'framer-motion';
import '../styles/MoodSelector.css';
import { moods } from '../utils/moods';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <motion.div
      className="mood-selector"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="mood-question">How are you feeling today?</h2>

      <motion.div className="mood-grid">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            className={`mood-card ${selectedMood === mood.id ? 'active' : ''}`}
            onClick={() => onMoodSelect(mood.id)}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.2)`,
            }}
            whileTap={{ scale: 0.95 }}
            layoutId={`mood-${mood.id}`}
          >
            <motion.span
              className="mood-emoji"
              animate={selectedMood === mood.id ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {mood.emoji}
            </motion.span>
            <span className="mood-label">{mood.label}</span>

            {selectedMood === mood.id && (
              <motion.div
                className="mood-indicator"
                layoutId="mood-indicator"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MoodSelector;
