const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

router.use(protect, requireRole('admin'));

router.post('/departments', adminController.createDepartment);
router.get('/departments', adminController.getDepartments);
router.post('/years', adminController.createYear);
router.post('/divisions', adminController.createDivision);
router.post('/batches', adminController.createBatch);
router.get('/batches', adminController.getBatches);
router.post('/students', adminController.createStudent);
router.get('/students', adminController.getStudents);
router.post('/subjects', adminController.createSubject);
router.get('/subjects', adminController.getSubjects);
router.get('/faculty-by-department', adminController.getFacultyByDepartment);
router.get('/students-by-batch', adminController.getStudentsByBatch);
router.post('/users', adminController.createUser);
router.get('/users', adminController.getUsers);

module.exports = router;
