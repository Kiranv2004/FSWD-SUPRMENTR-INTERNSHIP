import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '../utils/helpers';

const WeatherForecast = ({ forecast, isCelsius }) => {
  if (!forecast || forecast.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      className="forecast-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 className="forecast-title" variants={itemVariants}>
        📅 5-Day Forecast
      </motion.h3>

      <motion.div className="forecast-grid">
        {forecast.map((day, index) => {
          const temp = isCelsius ? day.temp : (day.temp * 9/5) + 32;
          const tempUnit = isCelsius ? '°C' : '°F';

          return (
            <motion.div
              key={index}
              className="forecast-day"
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="forecast-day-name">{day.day}</div>
              <div className="forecast-icon">
                {getWeatherIcon(day.icon, day.condition)}
              </div>
              <div className="forecast-temp">
                {Math.round(temp)}{tempUnit}
              </div>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>
                💨 {day.windSpeed}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default WeatherForecast;
