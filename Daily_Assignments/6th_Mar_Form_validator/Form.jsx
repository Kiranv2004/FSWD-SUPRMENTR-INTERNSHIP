import React, { useState, useEffect } from 'react';
import '../styles/Form.css';

// ============================================
// Validation Function
// ============================================
const validateForm = (formData) => {
  const errors = {};

  // Full Name validation
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full Name is required';
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  // Age validation
  if (!formData.age) {
    errors.age = 'Age is required';
  } else if (parseInt(formData.age) < 18) {
    errors.age = 'Age must be at least 18 years';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter';
  } else if (!/\d/.test(formData.password)) {
    errors.password = 'Password must contain at least one number';
  }

  // Confirm Password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Gender validation
  if (!formData.gender) {
    errors.gender = 'Please select a gender';
  }

  // Skills validation
  if (formData.skills.length === 0) {
    errors.skills = 'Please select at least one skill';
  }

  // Country validation
  if (!formData.country) {
    errors.country = 'Please select a country';
  }

  // Date of Birth validation
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = 'Date of Birth is required';
  }

  // Profile Image validation
  if (!formData.profileImage) {
    errors.profileImage = 'Please upload a profile image';
  } else if (!['image/jpeg', 'image/png'].includes(formData.profileImage.type)) {
    errors.profileImage = 'Only JPG and PNG images are allowed';
  }

  // Terms & Conditions validation
  if (!formData.terms) {
    errors.terms = 'You must accept the Terms & Conditions';
  }

  return errors;
};

// ============================================
// Form Component
// ============================================
function Form({ isDarkMode }) {
  // Form data state - loaded from localStorage
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    return saved
      ? JSON.parse(saved)
      : {
          fullName: '',
          email: '',
          phone: '',
          age: '',
          password: '',
          confirmPassword: '',
          gender: '',
          skills: [],
          country: '',
          dateOfBirth: '',
          profileImage: null,
          profileImagePreview: null,
          terms: false,
        };
  });

  // Errors state
  const [errors, setErrors] = useState({});

  // Success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Show password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Input validity tracking for styling
  const [touched, setTouched] = useState({});

  // Save form data to localStorage on every change
  useEffect(() => {
    const dataToSave = { ...formData };
    delete dataToSave.profileImagePreview; // Don't save preview URL
    localStorage.setItem('formData', JSON.stringify(dataToSave));
  }, [formData]);

  // Handle regular input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle skills checkbox changes
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newSkills = checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value);
      return {
        ...prev,
        skills: newSkills,
      };
    });
    setTouched((prev) => ({
      ...prev,
      skills: true,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          profileImagePreview: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
    setTouched((prev) => ({
      ...prev,
      profileImage: true,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Mark all fields as touched to show errors
      const allTouched = {};
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      return;
    }

    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      // Success!
      setIsLoading(false);
      setIsSuccess(true);

      // Log data to console
      console.log('Form Submitted Successfully!');
      console.log('Form Data:', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        skills: formData.skills,
        country: formData.country,
        dateOfBirth: formData.dateOfBirth,
        profileImage: formData.profileImage?.name,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
      }, 2000);
    }, 1500);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      password: '',
      confirmPassword: '',
      gender: '',
      skills: [],
      country: '',
      dateOfBirth: '',
      profileImage: null,
      profileImagePreview: null,
      terms: false,
    });
    setErrors({});
    setIsSuccess(false);
    setTouched({});
    localStorage.removeItem('formData');
  };

  // Check if form is valid
  const isFormValid = Object.keys(validateForm(formData)).length === 0;

  // Determine input styling based on validation state
  const getInputClassName = (fieldName) => {
    let className = 'form-input';
    if (touched[fieldName]) {
      if (errors[fieldName]) {
        className += ' input-error';
      } else {
        className += ' input-success';
      }
    }
    return className;
  };

  return (
    <div className="form-container">
      {/* Success Message */}
      {isSuccess && (
        <div className="success-message">
          <div className="success-content">
            <span className="success-icon">✓</span>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Submitting your registration...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        {/* Full Name Section */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
              className={getInputClassName('fullName')}
              placeholder="Enter your full name"
            />
            {touched.fullName && formData.fullName && (
              <span className="char-counter">
                {formData.fullName.length}/50
              </span>
            )}
          </div>
          {touched.fullName && errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

        {/* Email Section */}
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            className={getInputClassName('email')}
            placeholder="Enter your email address"
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Phone Number Section */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
            className={getInputClassName('phone')}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
          />
          {touched.phone && errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        {/* Age Section */}
        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            onBlur={() => setTouched((prev) => ({ ...prev, age: true }))}
            className={getInputClassName('age')}
            placeholder="Enter your age"
            min="1"
            max="120"
          />
          {touched.age && errors.age && (
            <span className="error-message">{errors.age}</span>
          )}
        </div>

        {/* Password Section */}
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              className={getInputClassName('password')}
              placeholder="Min 6 chars, 1 uppercase, 1 number"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {touched.password && formData.password && (
            <span className="char-counter">{formData.password.length}/50</span>
          )}
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        {/* Confirm Password Section */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, confirmPassword: true }))
              }
              className={getInputClassName('confirmPassword')}
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        {/* Gender Section */}
        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
                onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
              />
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
                onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
              />
              Female
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
                onBlur={() => setTouched((prev) => ({ ...prev, gender: true }))}
              />
              Other
            </label>
          </div>
          {touched.gender && errors.gender && (
            <span className="error-message">{errors.gender}</span>
          )}
        </div>

        {/* Skills Section */}
        <div className="form-group">
          <label>Skills *</label>
          <div className="checkbox-group">
            {['HTML', 'CSS', 'JavaScript', 'React'].map((skill) => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={handleSkillChange}
                  onBlur={() => setTouched((prev) => ({ ...prev, skills: true }))}
                />
                {skill}
              </label>
            ))}
          </div>
          {touched.skills && errors.skills && (
            <span className="error-message">{errors.skills}</span>
          )}
        </div>

        {/* Country Section */}
        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            onBlur={() => setTouched((prev) => ({ ...prev, country: true }))}
            className={getInputClassName('country')}
          >
            <option value="">Select a country</option>
            <option value="india">India</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="canada">Canada</option>
            <option value="australia">Australia</option>
            <option value="germany">Germany</option>
            <option value="france">France</option>
            <option value="japan">Japan</option>
          </select>
          {touched.country && errors.country && (
            <span className="error-message">{errors.country}</span>
          )}
        </div>

        {/* Date of Birth Section */}
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, dateOfBirth: true }))
            }
            className={getInputClassName('dateOfBirth')}
          />
          {touched.dateOfBirth && errors.dateOfBirth && (
            <span className="error-message">{errors.dateOfBirth}</span>
          )}
        </div>

        {/* Profile Image Upload Section */}
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image (JPG/PNG) *</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/jpeg,image/png"
              onChange={handleImageUpload}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, profileImage: true }))
              }
              className="file-input"
            />
            <label htmlFor="profileImage" className="file-upload-label">
              Choose Image
            </label>
          </div>
          {formData.profileImagePreview && (
            <div className="image-preview">
              <img src={formData.profileImagePreview} alt="Preview" />
              <p>{formData.profileImage?.name}</p>
            </div>
          )}
          {touched.profileImage && errors.profileImage && (
            <span className="error-message">{errors.profileImage}</span>
          )}
        </div>

        {/* Terms & Conditions Section */}
        <div className="form-group">
          <label className="checkbox-label checkbox-large">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleCheckboxChange}
              onBlur={() => setTouched((prev) => ({ ...prev, terms: true }))}
            />
            I accept the Terms & Conditions *
          </label>
          {touched.terms && errors.terms && (
            <span className="error-message">{errors.terms}</span>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={resetForm}
          >
            Reset Form
          </button>
        </div>
      </form>

      {/* Form Errors Summary */}
      {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
        <div className="errors-summary">
          <h3>Please fix the following errors:</h3>
          <ul>
            {Object.entries(errors).map(([field, error]) => (
              touched[field] && (
                <li key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}: {error}
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Form;
