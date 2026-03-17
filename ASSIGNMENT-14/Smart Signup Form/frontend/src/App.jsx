import { motion } from 'framer-motion';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div className="page-bg">
      <motion.div
        className="signup-card-wrapper"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <SignupForm />
      </motion.div>
    </div>
  );
}

export default App;
