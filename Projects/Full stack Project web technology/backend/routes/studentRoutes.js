const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const studentController = require('../controllers/studentController');

router.use(protect, requireRole('student'));

router.get('/results', studentController.getResults);

module.exports = router;
