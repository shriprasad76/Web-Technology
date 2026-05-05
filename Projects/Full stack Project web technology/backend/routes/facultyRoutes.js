const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const facultyController = require('../controllers/facultyController');

router.use(protect, requireRole('faculty'));

router.post('/labs', facultyController.createLab);
router.get('/labs', facultyController.getLabs);
router.get('/labs/:labId/students', facultyController.getLabStudents);
router.get('/labs/:labId/results', facultyController.getLabResults);
router.get('/subjects', facultyController.getSubjects);
router.get('/batches', facultyController.getBatches);
router.post('/practicals', facultyController.createPractical);
router.post('/evaluations', facultyController.submitMarks);
router.get('/students', facultyController.getStudents);
router.get('/practicals', facultyController.getPracticals);

module.exports = router;
