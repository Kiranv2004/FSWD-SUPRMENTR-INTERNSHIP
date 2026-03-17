import React, { useState } from 'react';
import { FaBars, FaSearch, FaUser, FaBell, FaCog } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ onMenuClick, onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick} title="Toggle sidebar">
          <FaBars />
        </button>
        <div className="logo">
          <span className="logo-icon">▶</span>
          <span className="logo-text">VideoHub</span>
        </div>
      </div>

      <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
        <input
          type="text"
          className="search-input"
          placeholder="Search videos, channels, playlists..."
          value={searchInput}
          onChange={handleSearch}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <button className="search-btn" title="Search">
          <FaSearch />
        </button>
      </div>

      <div className="navbar-right">
        <button className="icon-btn notification-btn" title="Notifications">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        <button className="icon-btn settings-btn" title="Settings">
          <FaCog />
        </button>
        <button className="profile-btn" title="Profile">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="Profile"
            className="profile-avatar"
          />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
