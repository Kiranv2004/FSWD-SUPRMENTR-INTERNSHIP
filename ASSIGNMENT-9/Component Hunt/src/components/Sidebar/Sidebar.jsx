import React, { useState } from 'react';
import { sidebarCategories } from '../../data/mockData';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  const [activeCategory, setActiveCategory] = useState('home');

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Menu</h3>
          <div className="sidebar-categories">
            {sidebarCategories.slice(0, 4).map((category) => (
              <button
                key={category.id}
                className={`sidebar-item ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <h3 className="sidebar-title">Your Library</h3>
          <div className="sidebar-categories">
            {sidebarCategories.slice(4).map((category) => (
              <button
                key={category.id}
                className={`sidebar-item ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <h3 className="sidebar-title">Subscriptions</h3>
          <div className="subscriptions-list">
            {['Code Masters', 'Dev Academy', 'Tech Talks', 'Design Patterns'].map((sub) => (
              <button key={sub} className="subscription-item">
                <span className="sub-avatar">👤</span>
                <span className="sub-name">{sub}</span>
              </button>
            ))}
            <button className="browse-more-btn">
              Browse more...
            </button>
          </div>
        </div>

        <hr className="sidebar-divider" />

        <div className="sidebar-footer">
          <p className="footer-text">
            © 2024 VideoHub. All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
