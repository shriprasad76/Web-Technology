const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// ======================== TEACHER ROUTES ========================

// Lab management
router.get('/labs/:teacher_id', teacherController.getTeacherLabs);
router.post('/labs/create', teacherController.createLab);
router.get('/labs/students/:lab_id', teacherController.getLabStudents);
router.get('/labs/summary/:lab_id', teacherController.getLabSummary);

// Update practical status
router.put('/practicals/update-status', teacherController.updatePracticalStatus);
router.put('/practicals/update-status-batch', teacherController.updatePracticalStatusBatch);

module.exports = router;
