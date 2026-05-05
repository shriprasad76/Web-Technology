const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// ======================== ADMIN ROUTES ========================

// Student management
router.get('/students', adminController.getAllStudents);
router.post('/students/add', adminController.addStudent);
router.put('/students/update', adminController.updateStudent);
router.delete('/students/delete', adminController.deleteStudent);

// Teacher management
router.get('/teachers', adminController.getAllTeachers);
router.post('/teachers/add', adminController.addTeacher);
router.put('/teachers/update', adminController.updateTeacher);
router.delete('/teachers/delete', adminController.deleteTeacher);

module.exports = router;
