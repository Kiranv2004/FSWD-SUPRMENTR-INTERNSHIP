import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/ParticleEffect.css';
import { generateParticles } from '../utils/particles';
import { getMoodById } from '../utils/moods';

const ParticleEffect = ({ selectedMood }) => {
  const [particles, setParticles] = useState([]);
  const mood = getMoodById(selectedMood);

  useEffect(() => {
    setParticles(generateParticles(15));
  }, [selectedMood]);

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{
            left: `${particle.left}%`,
            bottom: '-10px',
            opacity: particle.opacity,
            scale: 0,
          }}
          animate={{
            bottom: '100vh',
            opacity: 0,
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: mood.color,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
