const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// ======================== STUDENT ROUTES ========================

// Lab access
router.get('/labs/:student_id', studentController.getStudentLabs);
router.get('/practicals/:student_id/:lab_id', studentController.getStudentPracticals);

// Summary
router.get('/summary/:student_id', studentController.getStudentSummary);

module.exports = router;
