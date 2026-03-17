import React, { useState } from 'react';
import { FaPlay, FaPlus, FaEllipsisV } from 'react-icons/fa';
import './VideoCard.css';

function VideoCard({ video, onVideoSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="video-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="video-thumbnail-container">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumbnail"
        />
        <div className="video-overlay">
          {isHovered && (
            <>
              <button
                className="play-btn"
                onClick={() => onVideoSelect(video)}
                title="Play video"
              >
                <FaPlay />
              </button>
              <button className="add-to-playlist-btn" title="Add to playlist">
                <FaPlus />
              </button>
            </>
          )}
        </div>
        <div className="video-duration">{video.duration}</div>
      </div>

      <div className="video-info">
        <button className="channel-avatar">
          <span>👤</span>
        </button>

        <div className="video-details">
          <h3 className="video-title">{video.title}</h3>
          <p className="channel-name">{video.channel}</p>
          <div className="video-meta">
            <span className="views">{video.views} views</span>
            <span className="separator">•</span>
            <span className="upload-time">{video.uploadedTime}</span>
          </div>
        </div>

        <button className="video-menu-btn" title="More options">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
}

export default VideoCard;
