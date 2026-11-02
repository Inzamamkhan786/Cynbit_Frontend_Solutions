const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { validateStatusUpdate } = require('../middleware/validation');
const {
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { getDashboardStats } = require('../controllers/statsController');

// All admin routes require authentication
router.use(requireAuth);

// Enquiry CRM endpoints
router.get('/enquiries', getAllEnquiries);
router.get('/enquiries/:id', getEnquiryById);
router.patch('/enquiries/:id/status', validateStatusUpdate, updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

// Dashboard KPI stats
router.get('/stats', getDashboardStats);

module.exports = router;
