import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '../utils/helpers';

const WeatherCard = ({ weather, isCelsius }) => {
  if (!weather) return null;

  const temp = isCelsius ? weather.temperature : (weather.temperature * 9/5) + 32;
  const feelsLike = isCelsius ? weather.feelsLike : (weather.feelsLike * 9/5) + 32;
  const tempUnit = isCelsius ? '°C' : '°F';

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
      className="weather-card fade-in-scale"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="city-name">
          {weather.city}, {weather.country}
        </h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="weather-condition">{weather.description.toUpperCase()}</p>
      </motion.div>

      <motion.div
        className="weather-icon"
        variants={itemVariants}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        {getWeatherIcon(weather.icon, weather.condition)}
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="temperature">
          {Math.round(temp)}{tempUnit}
        </div>
        <div className="feels-like">
          Feels like {Math.round(feelsLike)}{tempUnit}
        </div>
      </motion.div>

      <motion.div className="weather-details" variants={containerVariants}>
        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-label">💧 Humidity</div>
          <div className="detail-value">{weather.humidity}%</div>
        </motion.div>

        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-label">💨 Wind Speed</div>
          <div className="detail-value">{weather.windSpeed} km/h</div>
        </motion.div>

        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-label">🧭 Pressure</div>
          <div className="detail-value">{weather.pressure} hPa</div>
        </motion.div>

        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-label">👁️ Visibility</div>
          <div className="detail-value">{weather.visibility} km</div>
        </motion.div>

        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-label">☁️ Cloud Cover</div>
          <div className="detail-value">{weather.clouds}%</div>
        </motion.div>

        <motion.div className="detail-item" variants={itemVariants}>
          <div className="detail-label">✨ UV Index</div>
          <div className="detail-value">Moderate</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherCard;
