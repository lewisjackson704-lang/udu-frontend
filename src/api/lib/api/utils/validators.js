/**
 * Validate Email Address
 * Ensures the email format follows standard conventions.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
export const isEmailValid = (email) => {
  if (typeof email !== "string") {
    console.warn("Invalid email type. Expected a string.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simplified email validation regex
  return emailRegex.test(email.trim());
};

/**
 * Validate Password Strength
 * Ensures the password meets minimum strength criteria:
 * - At least 8 characters long
 * - Contains at least one digit
 * - Contains at least one uppercase letter
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is strong, false otherwise.
 */
export const isPasswordStrong = (password) => {
  if (typeof password !== "string") {
    console.warn("Invalid password type. Expected a string.");
    return false;
  }

  const isLongEnough = password.length >= 8;
  const hasDigit = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  return isLongEnough && hasDigit && hasUppercase;
};
