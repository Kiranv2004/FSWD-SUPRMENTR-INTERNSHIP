export const generateParticles = (count = 20) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
      size: 4 + Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.5
    });
  }
  
  return particles;
};

export const particleVariants = {
  animate: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 2,
      ease: 'easeOut'
    }
  }
};
