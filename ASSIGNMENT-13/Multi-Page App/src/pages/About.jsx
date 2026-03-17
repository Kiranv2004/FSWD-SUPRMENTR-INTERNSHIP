import { motion } from 'framer-motion'

const values = [
  'Focused UX built with reusable components',
  'Scalable architecture for growing products',
  'Smooth interactions for delightful user journeys',
]

function About() {
  return (
    <motion.main
      className="container page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <section className="panel">
        <p className="badge">About</p>
        <h2>We build interfaces that feel fast, clean, and intuitive.</h2>
        <p>
          This SPA demonstrates how product landing pages and utility dashboards can coexist in one cohesive React application.
        </p>

        <div className="grid-cards compact">
          {values.map((value) => (
            <article key={value} className="card">
              <h3>Why it matters</h3>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>
    </motion.main>
  )
}

export default About
