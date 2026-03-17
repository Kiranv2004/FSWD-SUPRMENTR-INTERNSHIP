import { useMemo, useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import PasswordStrength from './PasswordStrength';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

function validate(values) {
  const nextErrors = {};

  if (!values.fullName.trim()) {
    nextErrors.fullName = 'Full name is required.';
  } else if (values.fullName.trim().length < 3) {
    nextErrors.fullName = 'Full name must be at least 3 characters.';
  }

  if (!values.email.trim()) {
    nextErrors.email = 'Email is required.';
  } else if (!emailRegex.test(values.email)) {
    nextErrors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    nextErrors.password = 'Password is required.';
  } else if (!passwordRegex.test(values.password)) {
    nextErrors.password =
      'Min 8 chars with uppercase, lowercase, number, and special character.';
  }

  if (!values.confirmPassword) {
    nextErrors.confirmPassword = 'Confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    nextErrors.confirmPassword = 'Passwords do not match.';
  }

  return nextErrors;
}

function SignupForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const visibleErrors = {
    fullName: touched.fullName ? errors.fullName : '',
    email: touched.email ? errors.email : '',
    password: touched.password ? errors.password : '',
    confirmPassword: touched.confirmPassword ? errors.confirmPassword : ''
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFeedback({ type: '', message: '' });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allTouched = {
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);

    if (!isValid) {
      setFeedback({ type: 'error', message: 'Please fix highlighted fields.' });
      return;
    }

    try {
      setSubmitting(true);
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiBaseUrl}/api/auth/signup`, form);

      setFeedback({ type: 'success', message: response.data.message });
      setForm({ fullName: '', email: '', password: '', confirmPassword: '' });
      setTouched({});
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to signup right now.';
      setFeedback({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-card">
      <h1>Create Account</h1>
      <p className="subtitle">Sign up to get started with your smart dashboard.</p>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="fullName"
          label="Full Name"
          placeholder="John Doe"
          value={form.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={visibleErrors.fullName}
          icon="👤"
          autoComplete="name"
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={visibleErrors.email}
          icon="✉️"
          autoComplete="email"
        />

        <InputField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={visibleErrors.password}
          icon="🔒"
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          }
        />

        <PasswordStrength password={form.password} />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={visibleErrors.confirmPassword}
          icon="✅"
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          }
        />

        <button className="submit-btn" type="submit" disabled={!isValid || submitting}>
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      {feedback.message ? (
        <p className={`feedback ${feedback.type === 'success' ? 'success' : 'error'}`}>
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
}

export default SignupForm;
