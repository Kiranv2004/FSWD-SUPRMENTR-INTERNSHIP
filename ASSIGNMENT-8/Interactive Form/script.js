// Get form and input elements
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const termsCheckbox = document.getElementById('terms');
const successMessage = document.getElementById('successMessage');
const togglePasswordBtn = document.getElementById('togglePassword');

// Error message elements
const errorMessages = {
    fullName: document.getElementById('fullNameError'),
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmPasswordError'),
    phone: document.getElementById('phoneError'),
    gender: document.getElementById('genderError'),
    terms: document.getElementById('termsError')
};

// ===== VALIDATION FUNCTIONS =====

// Validate Full Name
function validateFullName(name) {
    if (name.trim() === '') {
        showError('fullName', 'Name cannot be empty');
        return false;
    }
    if (name.trim().length < 3) {
        showError('fullName', 'Name must be at least 3 characters long');
        return false;
    }
    clearError('fullName');
    return true;
}

// Validate Email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        showError('email', 'Email cannot be empty');
        return false;
    }
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    }
    clearError('email');
    return true;
}

// Validate Password
function validatePassword(password) {
    if (password === '') {
        showError('password', 'Password cannot be empty');
        return false;
    }
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters long');
        return false;
    }
    if (!/\d/.test(password)) {
        showError('password', 'Password must include at least one number');
        return false;
    }
    clearError('password');
    return true;
}

// Validate Confirm Password
function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword === '') {
        showError('confirmPassword', 'Please confirm your password');
        return false;
    }
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return false;
    }
    clearError('confirmPassword');
    return true;
}

// Validate Phone Number
function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    const cleanedPhone = phone.replace(/\D/g, '');
    
    if (phone.trim() === '') {
        showError('phone', 'Phone number cannot be empty');
        return false;
    }
    if (!phoneRegex.test(cleanedPhone)) {
        showError('phone', 'Phone number must be exactly 10 digits');
        return false;
    }
    clearError('phone');
    return true;
}

// Validate Gender
function validateGender() {
    const selectedGender = Array.from(genderInputs).some(input => input.checked);
    if (!selectedGender) {
        showError('gender', 'Please select a gender');
        return false;
    }
    clearError('gender');
    return true;
}

// Validate Terms Checkbox
function validateTerms() {
    if (!termsCheckbox.checked) {
        showError('terms', 'You must agree to the Terms & Conditions');
        return false;
    }
    clearError('terms');
    return true;
}

// ===== ERROR HANDLING FUNCTIONS =====

// Show error message and highlight field
function showError(fieldName, message) {
    const errorElement = errorMessages[fieldName];
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        if (inputElement) {
            inputElement.classList.add('error');
            inputElement.classList.remove('success');
        }
    }
}

// Clear error message and remove highlighting
function clearError(fieldName) {
    const errorElement = errorMessages[fieldName];
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    if (inputElement) {
        inputElement.classList.remove('error');
        inputElement.classList.add('success');
    }
}

// ===== REAL-TIME VALIDATION =====

// Full Name - Real-time validation
fullNameInput.addEventListener('blur', () => {
    validateFullName(fullNameInput.value);
});

fullNameInput.addEventListener('input', () => {
    if (fullNameInput.classList.contains('error')) {
        validateFullName(fullNameInput.value);
    }
});

// Email - Real-time validation
emailInput.addEventListener('blur', () => {
    validateEmail(emailInput.value);
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail(emailInput.value);
    }
});

// Password - Real-time validation
passwordInput.addEventListener('blur', () => {
    validatePassword(passwordInput.value);
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        validatePassword(passwordInput.value);
    }
});

// Confirm Password - Real-time validation
confirmPasswordInput.addEventListener('blur', () => {
    validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
});

confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.classList.contains('error')) {
        validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    }
});

// Phone - Real-time validation
phoneInput.addEventListener('blur', () => {
    validatePhone(phoneInput.value);
});

phoneInput.addEventListener('input', () => {
    if (phoneInput.classList.contains('error')) {
        validatePhone(phoneInput.value);
    }
});

// Gender - Real-time validation
genderInputs.forEach(input => {
    input.addEventListener('change', () => {
        if (document.getElementById('genderError').classList.contains('show')) {
            validateGender();
        }
    });
});

// Terms checkbox - Real-time validation
termsCheckbox.addEventListener('change', () => {
    if (document.getElementById('termsError').classList.contains('show')) {
        validateTerms();
    }
});

// ===== PASSWORD TOGGLE FUNCTIONALITY =====

togglePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = '👁️';
    }
});

// ===== FORM SUBMISSION =====

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Hide success message initially
    successMessage.style.display = 'none';
    
    // Validate all fields
    const isFullNameValid = validateFullName(fullNameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);
    const isConfirmPasswordValid = validateConfirmPassword(
        passwordInput.value, 
        confirmPasswordInput.value
    );
    const isPhoneValid = validatePhone(phoneInput.value);
    const isGenderValid = validateGender();
    const isTermsValid = validateTerms();
    
    // If all validations pass
    if (
        isFullNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isPhoneValid &&
        isGenderValid &&
        isTermsValid
    ) {
        // Show success message with animation
        successMessage.style.display = 'block';
        
        // Log form data (for demonstration)
        console.log({
            fullName: fullNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            gender: Array.from(genderInputs).find(input => input.checked).value,
            termsAccepted: termsCheckbox.checked
        });
        
        // Optional: Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            // Clear all success states
            document.querySelectorAll('input.success').forEach(input => {
                input.classList.remove('success');
            });
            successMessage.style.display = 'none';
        }, 2000);
    }
});

// ===== FORM RESET =====

form.addEventListener('reset', () => {
    // Clear all error messages
    Object.keys(errorMessages).forEach(fieldName => {
        clearError(fieldName);
    });
    
    // Remove all success states
    document.querySelectorAll('input.success').forEach(input => {
        input.classList.remove('success');
    });
    
    // Hide success message
    successMessage.style.display = 'none';
    
    // Reset password visibility
    passwordInput.type = 'password';
    togglePasswordBtn.textContent = '👁️';
});
