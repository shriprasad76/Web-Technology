const { Practical, Subject, Evaluation, Student, User, Lab, LabStudent, Batch, Division, Year } = require('../models');
const { calculateFinalScore, calculateLabScore } = require('../utils/calc');

exports.createLab = async (req, res, next) => {
  try {
    const { name, subjectId, batchId, totalPracticals } = req.body;
    if (!name || !subjectId || !batchId) {
      return res.status(400).json({ message: 'Name, subjectId, and batchId are required.' });
    }

    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });

    const batch = await Batch.findByPk(batchId);
    if (!batch) return res.status(404).json({ message: 'Batch not found.' });

    const lab = await Lab.create({
      name,
      subjectId,
      batchId,
      facultyId: req.user.id,
      totalPracticals: totalPracticals || 12,
    });

    const students = await Student.findAll({ where: { batchId } });
    await Promise.all(students.map((student) => LabStudent.create({ labId: lab.id, studentId: student.id })));

    res.status(201).json({ lab, studentCount: students.length });
  } catch (error) {
    next(error);
  }
};

exports.getLabs = async (req, res, next) => {
  try {
    const labs = await Lab.findAll({
      where: { facultyId: req.user.id },
      include: [
        { model: Subject, attributes: ['id', 'name'] },
        { model: Batch, attributes: ['id', 'name'] },
      ],
    });
    res.json(labs);
  } catch (error) {
    next(error);
  }
};

exports.getLabStudents = async (req, res, next) => {
  try {
    const labId = req.params.labId;
    const lab = await Lab.findOne({ where: { id: labId, facultyId: req.user.id } });
    if (!lab) return res.status(404).json({ message: 'Lab not found or access denied.' });

    const assignments = await LabStudent.findAll({
      where: { labId },
      include: [{ model: Student, attributes: ['id', 'name', 'rollNumber'] }],
    });

    const evaluations = await Evaluation.findAll({ where: { labId }, include: [{ model: Practical, attributes: ['id', 'title', 'practicalNumber'] }] });

    res.json({ lab, students: assignments.map((assignment) => assignment.Student), evaluations });
  } catch (error) {
    next(error);
  }
};

exports.getLabResults = async (req, res, next) => {
  try {
    const labId = req.params.labId;
    const lab = await Lab.findOne({ where: { id: labId, facultyId: req.user.id } });
    if (!lab) return res.status(404).json({ message: 'Lab not found or access denied.' });

    const students = await Student.findAll({
      include: [{ model: LabStudent, where: { labId } }],
    });

    const evaluations = await Evaluation.findAll({ where: { labId }, include: [{ model: Practical }] });

    const studentMap = {};
    students.forEach((student) => {
      studentMap[student.id] = { id: student.id, name: student.name, rollNumber: student.rollNumber, evaluations: [] };
    });

    evaluations.forEach((evaluation) => {
      if (!studentMap[evaluation.studentId]) return;
      studentMap[evaluation.studentId].evaluations.push(evaluation);
    });

    const labResults = Object.values(studentMap).map((student) => {
      const totalPractice = student.evaluations.reduce((sum, evalRow) => sum + evalRow.attendance + evalRow.journal + evalRow.performance, 0);
      const viva1 = Math.max(...student.evaluations.map((e) => e.viva1), 0);
      const viva2 = Math.max(...student.evaluations.map((e) => e.viva2), 0);
      const viva3 = Math.max(...student.evaluations.map((e) => e.viva3), 0);
      const finalScore = calculateLabScore({ totalPractice, viva1, viva2, viva3, practicalCount: lab.totalPracticals });
      return { ...student, totalPractice, viva1, viva2, viva3, finalScore };
    });

    res.json({ lab, labResults });
  } catch (error) {
    next(error);
  }
};

exports.createPractical = async (req, res, next) => {
  try {
    const { subjectId, title, practicalNumber, description } = req.body;
    if (!subjectId || !title || typeof practicalNumber !== 'number') {
      return res.status(400).json({ message: 'subjectId, title, and practicalNumber are required.' });
    }

    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });

    const practical = await Practical.create({ subjectId, title, practicalNumber, description });
    res.status(201).json(practical);
  } catch (error) {
    next(error);
  }
};

exports.submitMarks = async (req, res, next) => {
  try {
    const { studentId, subjectId, practicalId, attendance, journal, performance, viva1, viva2, viva3 } = req.body;
    if (!studentId || !subjectId || !practicalId) {
      return res.status(400).json({ message: 'studentId, subjectId, and practicalId are required.' });
    }

    const student = await Student.findByPk(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    const subject = await Subject.findByPk(subjectId);
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });
    const practical = await Practical.findByPk(practicalId);
    if (!practical) return res.status(404).json({ message: 'Practical not found.' });

    const finalScore = calculateFinalScore({ attendance, journal, performance, viva1, viva2, viva3 });

    let evaluation = await Evaluation.findOne({ where: { studentId, practicalId } });
    if (evaluation) {
      await evaluation.update({
        facultyId: req.user.id,
        subjectId,
        attendance: attendance || 0,
        journal: journal || 0,
        performance: performance || 0,
        viva1: viva1 || 0,
        viva2: viva2 || 0,
        viva3: viva3 || 0,
        finalScore,
      });
    } else {
      evaluation = await Evaluation.create({
        studentId,
        facultyId: req.user.id,
        subjectId,
        practicalId,
        attendance: attendance || 0,
        journal: journal || 0,
        performance: performance || 0,
        viva1: viva1 || 0,
        viva2: viva2 || 0,
        viva3: viva3 || 0,
        finalScore,
      });
    }

    res.status(201).json({ message: 'Marks recorded.', finalScore, evaluation });
  } catch (error) {
    next(error);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
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

exports.getBatches = async (req, res, next) => {
  try {
    const batches = await Batch.findAll({ include: [{ model: Division, include: [{ model: Year }] }] });
    res.json(batches);
  } catch (error) {
    next(error);
  }
};

exports.getPracticals = async (req, res, next) => {
  try {
    const practicals = await Practical.findAll({ include: [{ model: Subject, attributes: ['name'] }] });
    res.json(practicals);
  } catch (error) {
    next(error);
  }
};
