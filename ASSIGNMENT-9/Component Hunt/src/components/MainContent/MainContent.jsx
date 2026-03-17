import React, { useState, useMemo } from 'react';
import { mockVideos, categories } from '../../data/mockData';
import VideoCard from '../VideoCard/VideoCard';
import './MainContent.css';

function MainContent({ onVideoSelect, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredVideos = useMemo(() => {
    return mockVideos.filter((video) => {
      const matchesSearch =
        searchQuery === '' ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="main-content-wrapper">
      {/* Category Filter Bar */}
      <div className="category-filter">
        <div className="category-filter-inner">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-chip ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="chip-icon">{category.icon}</span>
              <span className="chip-text">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {filteredVideos.length === 0 ? (
          <div className="no-results">
            <p className="no-results-icon">🔍</p>
            <h2>No videos found</h2>
            <p className="no-results-text">
              {searchQuery
                ? `Try searching with different keywords`
                : 'Check back later for more content'}
            </p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h2 className="results-title">
                {searchQuery ? `Results for "${searchQuery}"` : 'Recommended'}
              </h2>
              <p className="results-count">
                {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="videos-grid">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onVideoSelect={onVideoSelect}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainContent;
