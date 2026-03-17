import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function NotFound() {
  return (
    <motion.main
      className="container page"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <section className="panel not-found">
        <p className="badge">404</p>
        <h2>Page not found</h2>
        <p>The page you requested does not exist or was moved.</p>
        <Link to="/" className="primary-btn">
          Back to Home
        </Link>
      </section>
    </motion.main>
  )
}

export default NotFound
