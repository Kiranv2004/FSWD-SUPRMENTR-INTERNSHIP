import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import VideoDetailModal from './components/VideoDetailModal/VideoDetailModal';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onSearch={setSearchQuery}
        />
        <div className="app-container">
          <Sidebar isOpen={sidebarOpen} />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <MainContent
                    onVideoSelect={handleVideoSelect}
                    searchQuery={searchQuery}
                  />
                }
              />
            </Routes>
          </main>
        </div>
        {selectedVideo && (
          <VideoDetailModal video={selectedVideo} onClose={closeModal} />
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
