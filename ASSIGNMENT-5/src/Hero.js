import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleCtaClick = () => {
    alert('Welcome! Let\'s get started on this exciting journey.');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left side - Text content */}
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to My Website</h1>
          <p className="hero-description">
            Discover exceptional solutions designed to elevate your digital presence. 
            We combine innovation, creativity, and expertise to deliver outstanding results 
            that exceed your expectations.
          </p>
          <button className="cta-button" onClick={handleCtaClick}>
            Get Started
          </button>
        </div>

        {/* Right side - Image */}
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=600&fit=crop"
            alt="Hero section illustration"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
