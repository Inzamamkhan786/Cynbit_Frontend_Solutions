const crypto = require('crypto');

/**
 * Generates a branded, unique reference ID for project enquiries.
 * Format: CYN-2026-ABC12
 */
const generateReferenceId = () => {
  const year = new Date().getFullYear();
  const randomChars = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars
  return `CYN-${year}-${randomChars}`;
};

module.exports = {
  generateReferenceId,
};
