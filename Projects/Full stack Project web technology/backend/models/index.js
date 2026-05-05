const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Department = require('./department')(sequelize, Sequelize.DataTypes);
const Year = require('./year')(sequelize, Sequelize.DataTypes);
const Division = require('./division')(sequelize, Sequelize.DataTypes);
const Batch = require('./batch')(sequelize, Sequelize.DataTypes);
const Student = require('./student')(sequelize, Sequelize.DataTypes);
const Subject = require('./subject')(sequelize, Sequelize.DataTypes);
const Lab = require('./lab')(sequelize, Sequelize.DataTypes);
const LabStudent = require('./labStudent')(sequelize, Sequelize.DataTypes);
const Practical = require('./practical')(sequelize, Sequelize.DataTypes);
const Evaluation = require('./evaluation')(sequelize, Sequelize.DataTypes);

Department.hasMany(Year, { foreignKey: 'departmentId' });
Year.belongsTo(Department, { foreignKey: 'departmentId' });

Year.hasMany(Division, { foreignKey: 'yearId' });
Division.belongsTo(Year, { foreignKey: 'yearId' });

Division.hasMany(Batch, { foreignKey: 'divisionId' });
Batch.belongsTo(Division, { foreignKey: 'divisionId' });

Batch.hasMany(Student, { foreignKey: 'batchId' });
Student.belongsTo(Batch, { foreignKey: 'batchId' });

User.hasOne(Student, { foreignKey: 'userId' });
Student.belongsTo(User, { foreignKey: 'userId' });

Department.hasMany(Subject, { foreignKey: 'departmentId' });
Subject.belongsTo(Department, { foreignKey: 'departmentId' });

User.hasMany(Subject, { foreignKey: 'facultyId' });
Subject.belongsTo(User, { foreignKey: 'facultyId' });

Subject.hasMany(Lab, { foreignKey: 'subjectId' });
Lab.belongsTo(Subject, { foreignKey: 'subjectId' });

Batch.hasMany(Lab, { foreignKey: 'batchId' });
Lab.belongsTo(Batch, { foreignKey: 'batchId' });

User.hasMany(Lab, { foreignKey: 'facultyId' });
Lab.belongsTo(User, { foreignKey: 'facultyId' });

Lab.hasMany(Practical, { foreignKey: 'labId' });
Practical.belongsTo(Lab, { foreignKey: 'labId' });

Lab.hasMany(Evaluation, { foreignKey: 'labId' });
Evaluation.belongsTo(Lab, { foreignKey: 'labId' });

Lab.hasMany(LabStudent, { foreignKey: 'labId' });
LabStudent.belongsTo(Lab, { foreignKey: 'labId' });

Student.hasMany(LabStudent, { foreignKey: 'studentId' });
LabStudent.belongsTo(Student, { foreignKey: 'studentId' });

Subject.hasMany(Practical, { foreignKey: 'subjectId' });
Practical.belongsTo(Subject, { foreignKey: 'subjectId' });

Student.hasMany(Evaluation, { foreignKey: 'studentId' });
Evaluation.belongsTo(Student, { foreignKey: 'studentId' });

Subject.hasMany(Evaluation, { foreignKey: 'subjectId' });
Evaluation.belongsTo(Subject, { foreignKey: 'subjectId' });

Practical.hasMany(Evaluation, { foreignKey: 'practicalId' });
Evaluation.belongsTo(Practical, { foreignKey: 'practicalId' });

User.hasMany(Evaluation, { foreignKey: 'facultyId' });
Evaluation.belongsTo(User, { foreignKey: 'facultyId' });

module.exports = {
  sequelize,
  User,
  Department,
  Year,
  Division,
  Batch,
  Student,
  Subject,
  Practical,
  Evaluation,
};
