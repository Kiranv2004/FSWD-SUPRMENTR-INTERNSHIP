import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Background.css';
import { getMoodById } from '../utils/moods';

const Background = ({ selectedMood, darkMode }) => {
  const mood = getMoodById(selectedMood);
  const gradient = darkMode ? mood.darkGradient : mood.gradient;

  return (
    <div className="background-container">
      <motion.div
        className="background-main"
        animate={{
          backgroundImage: gradient,
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ backgroundImage: gradient }}
      />

      {/* Animated blur circles for glassmorphism effect */}
      <motion.div
        className="blur-circle blur-1"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="blur-circle blur-2"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -50, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="blur-circle blur-3"
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Overlay for better text readability */}
      <div className="background-overlay" />
    </div>
  );
};

export default Background;
