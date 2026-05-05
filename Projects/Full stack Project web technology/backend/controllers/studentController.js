const { Evaluation, Subject, Practical, Student, LabStudent, Lab, Batch } = require('../models');
const { calculateLabScore } = require('../utils/calc');

exports.getResults = async (req, res, next) => {
  try {
    const student = await Student.findOne({ where: { userId: req.user.id } });
    if (!student) return res.status(404).json({ message: 'Student profile not found.' });

    const memberships = await LabStudent.findAll({
      where: { studentId: student.id },
      include: [
        {
          model: Lab,
          include: [
            { model: Subject, attributes: ['id', 'name'] },
            { model: Batch, attributes: ['id', 'name'] },
          ],
        },
      ],
    });

    const labResults = await Promise.all(memberships.map(async (membership) => {
      const lab = membership.Lab;
      const evaluations = await Evaluation.findAll({ where: { labId: lab.id }, include: [{ model: Practical, attributes: ['id', 'title', 'practicalNumber'] }] });
      const studentEvals = evaluations.filter((evaluation) => evaluation.studentId === student.id);
      const totalPracticeScore = studentEvals.reduce((sum, evaluation) => sum + evaluation.attendance + evaluation.journal + evaluation.performance, 0);
      const viva1 = Math.max(...studentEvals.map((evaluation) => evaluation.viva1), 0);
      const viva2 = Math.max(...studentEvals.map((evaluation) => evaluation.viva2), 0);
      const viva3 = Math.max(...studentEvals.map((evaluation) => evaluation.viva3), 0);
      const finalScore = calculateLabScore({ totalPractice: totalPracticeScore, viva1, viva2, viva3, practicalCount: lab.totalPracticals });

      return {
        labId: lab.id,
        labName: lab.name,
        subjectName: lab.Subject.name,
        batchName: lab.Batch.name,
        practicals: studentEvals.map((evaluation) => ({
          practicalId: evaluation.Practical.id,
          title: evaluation.Practical.title,
          attendance: evaluation.attendance,
          journal: evaluation.journal,
          performance: evaluation.performance,
          viva1: evaluation.viva1,
          viva2: evaluation.viva2,
          viva3: evaluation.viva3,
        })),
        totalPracticeScore,
        viva1,
        viva2,
        viva3,
        finalScore,
      };
    }));

    res.json(labResults);
  } catch (error) {
    next(error);
  }
};
