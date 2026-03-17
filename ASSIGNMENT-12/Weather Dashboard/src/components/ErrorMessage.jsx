import React from 'react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ error, onDismiss }) => {
  if (!error) return null;

  // Convert error text to handle line breaks
  const errorLines = error.split('\n');

  return (
    <motion.div
      className="error-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
    >
      <div className="error-title">⚠️ Oops! Something went wrong</div>
      <div className="error-message">
        {errorLines.map((line, index) => (
          <div key={index}>{line || <br />}</div>
        ))}
      </div>
      {onDismiss && (
        <motion.button
          onClick={onDismiss}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dismiss
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
