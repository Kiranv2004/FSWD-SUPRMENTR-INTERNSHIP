import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getUserLocation } from '../utils/api';

const SearchBar = ({ onSearch, isLoading, onLocationSearch }) => {
  const [city, setCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const handleLocationSearch = async () => {
    try {
      setIsSearching(true);
      const location = await getUserLocation();
      onLocationSearch(location);
    } catch (error) {
      alert('Failed to get your location. Please enable location access.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      className="search-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading || !city.trim()}
          style={{
            opacity: (isLoading || !city.trim()) ? 0.6 : 1,
            cursor: (isLoading || !city.trim()) ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        <motion.button
          type="button"
          onClick={handleLocationSearch}
          disabled={isLoading || isSearching}
          style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #4ecdc4 0%, #44a9a5 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: "'Poppins', sans-serif",
            cursor: (isLoading || isSearching) ? 'not-allowed' : 'pointer',
            opacity: (isLoading || isSearching) ? 0.6 : 1
          }}
          whileHover={!isLoading && !isSearching ? { scale: 1.05, y: -3 } : {}}
          whileTap={!isLoading && !isSearching ? { scale: 0.95 } : {}}
        >
          {isSearching ? '📍 Locating...' : '📍 My Location'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
