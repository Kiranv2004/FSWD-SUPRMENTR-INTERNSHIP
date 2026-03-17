import { motion } from 'framer-motion'

function Contact() {
  return (
    <motion.main
      className="container page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <section className="panel">
        <p className="badge">Contact</p>
        <h2>Let’s collaborate on your next web product.</h2>
        <p>Send your idea and we’ll respond with a quick execution plan.</p>

        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <input type="text" placeholder="Your name" required />
          <input type="email" placeholder="Your email" required />
          <textarea rows="5" placeholder="Your message" required />
          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>
      </section>
    </motion.main>
  )
}

export default Contact
