const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ======================== AUTH ROUTES ========================

// Admin Login
router.post('/admin-login', authController.adminLogin);

// Teacher Sign Up
router.post('/teacher-signup', authController.teacherSignUp);

// Student Sign Up
router.post('/student-signup', authController.studentSignUp);

// Teacher Login
router.post('/teacher-login', authController.teacherLogin);

// Student Login
router.post('/student-login', authController.studentLogin);

module.exports = router;
