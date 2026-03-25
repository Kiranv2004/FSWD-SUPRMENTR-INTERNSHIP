// Get form and input elements
const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Get error message elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Helper function: show error for a specific input
function showError(inputElement, errorElement, message) {
  inputElement.classList.add("input-error");
  errorElement.textContent = message;
}

// Helper function: clear error for a specific input
function clearError(inputElement, errorElement) {
  inputElement.classList.remove("input-error");
  errorElement.textContent = "";
}

// Validation function for Name
function validateName() {
  const nameValue = nameInput.value.trim();

  if (nameValue === "") {
    showError(nameInput, nameError, "Name is required.");
    return false;
  }

  clearError(nameInput, nameError);
  return true;
}

// Validation function for Email
function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    showError(emailInput, emailError, "Email is required.");
    return false;
  }

  if (!emailValue.includes("@")) {
    showError(emailInput, emailError, "Email must contain '@'.");
    return false;
  }

  clearError(emailInput, emailError);
  return true;
}

// Validation function for Password
function validatePassword() {
  const passwordValue = passwordInput.value;

  if (passwordValue.length < 6) {
    showError(passwordInput, passwordError, "Password must be at least 6 characters.");
    return false;
  }

  clearError(passwordInput, passwordError);
  return true;
}

// Validation function for Confirm Password
function validateConfirmPassword() {
  const passwordValue = passwordInput.value;
  const confirmPasswordValue = confirmPasswordInput.value;

  if (confirmPasswordValue === "") {
    showError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
    return false;
  }

  if (confirmPasswordValue !== passwordValue) {
    showError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
    return false;
  }

  clearError(confirmPasswordInput, confirmPasswordError);
  return true;
}

// Main form submit event
form.addEventListener("submit", function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Run all validations
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  // If all fields are valid, show a success message in console
  if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    console.log("Form submitted successfully.");
  }
});
