import { motion } from 'framer-motion';

const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z\d]/.test(password)) score += 1;
  return score;
}

function PasswordStrength({ password }) {
  const strength = getStrength(password);
  const percent = (strength / 5) * 100;
  const colorClass = `strength-${Math.max(strength, 1)}`;

  return (
    <div className="strength-wrap">
      <div className="strength-head">
        <span>Password strength</span>
        <span>{password ? labels[Math.max(strength - 1, 0)] : '—'}</span>
      </div>
      <div className="strength-track">
        <motion.div
          className={`strength-fill ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default PasswordStrength;
