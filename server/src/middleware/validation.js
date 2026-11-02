const ALLOWED_SERVICES = [
  'Web Development',
  'Mobile App Development',
  'AI Automation & AI Agents',
  'Custom Software Development',
  'Cloud Infrastructure',
  'UI/UX Design',
  'Other',
];

const ALLOWED_BUDGETS = [
  'Below ₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1,00,000',
  '₹1,00,000–₹5,00,000',
  'Above ₹5,00,000',
  'Not decided yet',
];

const ALLOWED_TIMELINES = [
  'ASAP',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Flexible',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

/**
 * Validates the Discovery Enquiry payload
 */
const validateEnquiry = (req, res, next) => {
  const {
    services,
    projectName,
    projectDesc,
    objective,
    targetAudience,
    features,
    budget,
    timeline,
    fullName,
    email,
    phone,
    company,
  } = req.body;

  const errors = [];

  // Step 1: Services
  if (!Array.isArray(services) || services.length === 0) {
    errors.push('At least one service must be selected.');
  } else {
    const invalidServices = services.filter((s) => !ALLOWED_SERVICES.includes(s));
    if (invalidServices.length > 0) {
      errors.push(`Invalid services selected: ${invalidServices.join(', ')}`);
    }
  }

  // Step 2: Project Info
  if (!projectName || typeof projectName !== 'string' || projectName.trim().length < 2) {
    errors.push('Project name is required (minimum 2 characters).');
  }

  if (!projectDesc || typeof projectDesc !== 'string' || projectDesc.trim().length < 10) {
    errors.push('Project description is required (minimum 10 characters).');
  }

  if (!objective || typeof objective !== 'string' || objective.trim().length < 2) {
    errors.push('Project objective is required.');
  }

  if (!targetAudience || typeof targetAudience !== 'string' || targetAudience.trim().length < 2) {
    errors.push('Target audience is required.');
  }

  // Step 3: Budget & Timeline
  if (!budget || !ALLOWED_BUDGETS.includes(budget)) {
    errors.push(`Please select a valid budget from: ${ALLOWED_BUDGETS.join(', ')}`);
  }

  if (!timeline || !ALLOWED_TIMELINES.includes(timeline)) {
    errors.push(`Please select a valid timeline from: ${ALLOWED_TIMELINES.join(', ')}`);
  }

  // Step 4: Contact Information
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.push('Full name is required (minimum 2 characters).');
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('A valid business email address is required.');
  }

  if (!phone || typeof phone !== 'string' || !PHONE_REGEX.test(phone.trim())) {
    errors.push('A valid contact phone number is required (at least 8-10 digits).');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please review the highlighted errors.',
      errors,
    });
  }

  // Attach sanitized fields to req.sanitizedBody
  req.sanitizedBody = {
    services,
    projectName: projectName.trim(),
    projectDesc: projectDesc.trim(),
    objective: objective.trim(),
    targetAudience: targetAudience.trim(),
    features: Array.isArray(features) ? features : [],
    budget,
    timeline,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    company: company && typeof company === 'string' ? company.trim() : '',
  };

  next();
};

/**
 * Validates admin status update payload
 */
const validateStatusUpdate = (req, res, next) => {
  const { status, note } = req.body;
  const ALLOWED_STATUSES = ['New', 'Contacted', 'In Progress', 'Completed', 'Rejected'];

  if (!status || !ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(', ')}`,
    });
  }

  req.sanitizedStatus = {
    status,
    note: note && typeof note === 'string' ? note.trim() : '',
  };

  next();
};

/**
 * Validates admin login credentials
 */
const validateLogin = (req, res, next) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username/Email and password are required.',
    });
  }
  next();
};

module.exports = {
  validateEnquiry,
  validateStatusUpdate,
  validateLogin,
  ALLOWED_SERVICES,
  ALLOWED_BUDGETS,
  ALLOWED_TIMELINES,
};
