import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = 'Loading weather data...' }) => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        className="loader-text"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default Loader;
