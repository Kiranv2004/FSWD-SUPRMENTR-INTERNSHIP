import React, { useState } from 'react';
import { FaTimes, FaThumbsUp, FaShareAlt, FaEllipsisH } from 'react-icons/fa';
import './VideoDetailModal.css';

function VideoDetailModal({ video, onClose }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <FaTimes />
        </button>

        <div className="modal-header">
          <h1 className="modal-title">{video.title}</h1>
          <p className="modal-subtitle">{video.description}</p>
        </div>

        <div className="video-player-container">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="video-player-placeholder"
          />
          <div className="video-player-overlay">
            <button className="play-video-btn" title="Play">
              ▶
            </button>
          </div>
        </div>

        <div className="modal-info">
          <div className="channel-section">
            <button className="channel-info">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=channel"
                alt={video.channel}
                className="channel-avatar"
              />
              <div className="channel-details">
                <p className="channel-name-modal">{video.channel}</p>
                <p className="channel-subscribers">{video.subscribers} subscribers</p>
              </div>
            </button>
            <button className="subscribe-btn">Subscribe</button>
          </div>

          <div className="action-buttons">
            <button
              className={`action-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <FaThumbsUp />
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <button className="action-btn">
              <FaShareAlt />
              <span>Share</span>
            </button>
            <button className="action-btn">
              <FaEllipsisH />
              <span>More</span>
            </button>
          </div>

          <div className="video-stats">
            <p>
              <strong>{video.views}</strong> views • <strong>{video.uploadedTime}</strong>
            </p>
          </div>

          <hr className="modal-divider" />

          <div className="comments-section">
            <h3>Comments</h3>
            <button className="add-comment">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="user-avatar"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                className="comment-input"
              />
            </button>

            <div className="comments-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="comment-item">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    alt={`User ${i}`}
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <p className="comment-author">User {i}</p>
                    <p className="comment-text">
                      This is an amazing tutorial! Very helpful.
                    </p>
                    <div className="comment-actions">
                      <button className="comment-like">👍</button>
                      <button className="comment-reply">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailModal;
