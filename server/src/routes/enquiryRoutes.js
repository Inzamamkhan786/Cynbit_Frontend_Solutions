const express = require('express');
const router = express.Router();
const { createEnquiry, trackEnquiry } = require('../controllers/enquiryController');
const { validateEnquiry } = require('../middleware/validation');
const { enquiryLimiter } = require('../middleware/rateLimiter');

// Public route to submit a project discovery enquiry
router.post('/', enquiryLimiter, validateEnquiry, createEnquiry);

// Public route for clients to track an enquiry by reference ID
router.get('/track/:refId', trackEnquiry);

module.exports = router;
