import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { getWeatherByCity, getWeatherForecast, getWeatherByCoordinates } from './utils/api';
import { getBackgroundClass } from './utils/helpers';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('London');
  const [isCelsius, setIsCelsius] = useState(true);
  const [backgroundClass, setBackgroundClass] = useState('bg-clear');

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setCurrentCity(savedCity);
      fetchWeather(savedCity);
    } else {
      fetchWeather('London');
    }
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCity(cityName);
      setWeather(weatherData);
      setCurrentCity(cityName);
      localStorage.setItem('lastCity', cityName);
      const currentTime = Math.floor(Date.now() / 1000);
      const isNight = currentTime > weatherData.sunset || currentTime < weatherData.sunrise;
      setBackgroundClass(getBackgroundClass(weatherData.condition, isNight));
      try {
        const forecastData = await getWeatherForecast(cityName);
        setForecast(forecastData);
      } catch (forecastError) {
        console.log('Forecast fetch error:', forecastError.message);
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    if (cityName.trim()) {
      fetchWeather(cityName);
    }
  };

  const handleLocationSearch = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCoordinates(location.latitude, location.longitude);
      setWeather(weatherData);
      setCurrentCity(weatherData.city);
      localStorage.setItem('lastCity', weatherData.city);
      const currentTime = Math.floor(Date.now() / 1000);
      const isNight = currentTime > weatherData.sunset || currentTime < weatherData.sunrise;
      setBackgroundClass(getBackgroundClass(weatherData.condition, isNight));
      try {
        const forecastData = await getWeatherForecast(weatherData.city);
        setForecast(forecastData);
      } catch (forecastError) {
        console.log('Forecast fetch error:', forecastError.message);
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperature = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className={`app-container ${backgroundClass}`}>
      <motion.div
        className="weather-dashboard"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="app-badge"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35 }}
          >
            Live Weather • OpenWeather
          </motion.div>
          <h1 className="city-name" style={{ marginBottom: '5px' }}>🌍 Weather Dashboard</h1>
          <p className="weather-condition" style={{ fontSize: '14px', marginBottom: '20px' }}>
            Real-time weather information at your fingertips
          </p>
        </motion.div>

        <SearchBar
          onSearch={handleSearch}
          isLoading={loading}
          onLocationSearch={handleLocationSearch}
        />

        <motion.div
          className="toggle-container"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <motion.button
            onClick={() => setIsCelsius(true)}
            className={`toggle-button ${isCelsius ? 'active' : ''}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
          >
            °C Celsius
          </motion.button>
          <motion.button
            onClick={() => setIsCelsius(false)}
            className={`toggle-button ${!isCelsius ? 'active' : ''}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
          >
            °F Fahrenheit
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <ErrorMessage key="error" error={error} onDismiss={() => setError(null)} />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading && <Loader key="loader" />}

          {!loading && weather && (
            <motion.div
              key={`weather-${weather.city}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <motion.div
                className="quick-stats"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
              >
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Condition</span>
                  <span className="quick-stat-value">{weather.condition}</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Humidity</span>
                  <span className="quick-stat-value">{weather.humidity}%</span>
                </div>
                <div className="quick-stat-item">
                  <span className="quick-stat-label">Wind</span>
                  <span className="quick-stat-value">{weather.windSpeed} km/h</span>
                </div>
              </motion.div>
              <WeatherCard weather={weather} isCelsius={isCelsius} />
              <WeatherForecast forecast={forecast} isCelsius={isCelsius} />
            </motion.div>
          )}

          {!loading && !weather && !error && (
            <motion.div
              key="empty"
              className="text-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ padding: '35px 0', color: '#666' }}
            >
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>🔍 Search for a city to see live weather</p>
              <p style={{ fontSize: '13px' }}>Try: London, Paris, New York, Tokyo, Sydney, Bangalore</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}
        >
          <p>Current city: {currentCity}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App;
