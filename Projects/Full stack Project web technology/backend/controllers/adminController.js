const { Department, Year, Division, Batch, Student, Subject, User } = require('../models');

exports.createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Department name is required.' });
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (error) {
    next(error);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    next(error);
  }
};

exports.createYear = async (req, res, next) => {
  try {
    const { label, departmentId } = req.body;
    if (!label || !departmentId) return res.status(400).json({ message: 'Label and departmentId are required.' });
    const year = await Year.create({ label, departmentId });
    res.status(201).json(year);
  } catch (error) {
    next(error);
  }
};

exports.createDivision = async (req, res, next) => {
  try {
    const { name, yearId } = req.body;
    if (!name || !yearId) return res.status(400).json({ message: 'Name and yearId are required.' });
    const division = await Division.create({ name, yearId });
    res.status(201).json(division);
  } catch (error) {
    next(error);
  }
};

exports.createBatch = async (req, res, next) => {
  try {
    const { name, divisionId } = req.body;
    if (!name || !divisionId) return res.status(400).json({ message: 'Name and divisionId are required.' });
    const batch = await Batch.create({ name, divisionId });
    res.status(201).json(batch);
  } catch (error) {
    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, batchId, userId } = req.body;
    if (!name || !rollNumber || !batchId) return res.status(400).json({ message: 'Name, rollNumber, and batchId are required.' });
    const student = await Student.create({ name, rollNumber, batchId, userId });
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

exports.getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.findAll({ include: [{ model: Division, include: [{ model: Year, include: [Department] }] }] });
    res.json(batches);
  } catch (error) {
    next(error);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: [{ model: Batch, include: [{ model: Division, include: [{ model: Year, include: [Department] }] }] }] });
    res.json(students);
  } catch (error) {
    next(error);
  }
};

exports.createSubject = async (req, res, next) => {
  try {
    const { name, departmentId, facultyId } = req.body;
    if (!name || !departmentId) return res.status(400).json({ message: 'Name and departmentId are required.' });
    const subject = await Subject.create({ name, departmentId, facultyId });
    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'Name, email, password, and role are required.' });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getFacultyByDepartment = async (req, res, next) => {
  try {
    const { departmentId } = req.query;
    const where = { role: 'faculty' };
    const include = [{ model: Subject, attributes: ['id', 'name', 'departmentId'] }];
    if (departmentId) {
      include[0].where = { departmentId };
    }

    const faculties = await User.findAll({ where, include });
    res.json(faculties);
  } catch (error) {
    next(error);
  }
};

exports.getStudentsByBatch = async (req, res, next) => {
  try {
    const { batchId } = req.query;
    if (!batchId) return res.status(400).json({ message: 'batchId is required.' });
    const students = await Student.findAll({ where: { batchId }, include: [{ model: Batch, include: [{ model: Division, include: [{ model: Year, include: [Department] }] }] }] });
    res.json(students);
  } catch (error) {
    next(error);
  }
};
