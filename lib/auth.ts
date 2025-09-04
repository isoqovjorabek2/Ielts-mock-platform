// Basic authentication helper functions

/**
 * Function to check if a password meets the required criteria.
 * @param password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
function isValidPassword(password: string): boolean {
    const minLength = 8;
    return password.length >= minLength;
}

/**
 * Function to hash a password (dummy implementation).
 * @param password - The password to hash.
 * @returns {string} - Returns the hashed password.
 */
function hashPassword(password: string): string {
    // This is a dummy implementation for illustration purposes.
    return `hashed_${password}`;
}

/**
 * Function to compare a plain password with a hashed password.
 * @param password - The plain password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns {boolean} - Returns true if the passwords match, false otherwise.
 */
function comparePassword(password: string, hashedPassword: string): boolean {
    return hashPassword(password) === hashedPassword;
}

export { isValidPassword, hashPassword, comparePassword };