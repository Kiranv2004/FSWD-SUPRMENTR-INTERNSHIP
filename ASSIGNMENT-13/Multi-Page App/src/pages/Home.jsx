import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const homeFeatures = [
  {
    title: 'Smooth Navigation',
    text: 'Route seamlessly through all pages with fast, no-reload SPA behavior.',
  },
  {
    title: 'Real Dashboard',
    text: 'Manage your daily priorities with a clean task-focused workspace.',
  },
  {
    title: 'Responsive Design',
    text: 'Looks polished on mobile, tablet, and desktop with fluid layouts.',
  },
]

function Home() {
  const location = useLocation()
  const authMessage = location.state?.message

  return (
    <motion.main
      className="container page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
    >
      <section className="hero">
        <p className="badge">Multi-Page React SPA</p>
        <h1>Build beautiful product experiences with modern routing.</h1>
        <p className="subtitle">
          NovaSphere is a polished starter experience that mirrors a real product website with animated navigation and focused functionality.
        </p>

        {authMessage && <p className="notice">{authMessage}</p>}

        <div className="hero-actions">
          <Link to="/dashboard" className="primary-btn">
            Open Dashboard
          </Link>
          <Link to="/about" className="ghost-btn">
            Learn More
          </Link>
        </div>
      </section>

      <section className="grid-cards">
        {homeFeatures.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </motion.main>
  )
}

export default Home
