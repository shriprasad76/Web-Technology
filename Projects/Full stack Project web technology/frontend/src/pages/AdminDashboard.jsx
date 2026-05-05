import { useEffect, useState } from 'react';
import { createAdminData, fetchAdminData } from '../services/api';

export default function AdminDashboard() {
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjectDepartmentId, setSubjectDepartmentId] = useState('');
  const [user, setUser] = useState({ name: '', email: '', password: '', role: 'faculty' });

  useEffect(() => {
    fetchAdminData('departments').then(setDepartments).catch(console.error);
    fetchAdminData('batches').then(setBatches).catch(console.error);
    fetchAdminData('students').then(setStudents).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      fetchAdminData(`faculty-by-department?departmentId=${selectedDepartment}`)
        .then(setFaculties)
        .catch(console.error);
    } else {
      setFaculties([]);
    }
  }, [selectedDepartment]);

  const handleDepartmentSubmit = async (event) => {
    event.preventDefault();
    await createAdminData('departments', { name: departmentName });
    setDepartmentName('');
    setDepartments(await fetchAdminData('departments'));
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    await createAdminData('users', user);
    setUser({ name: '', email: '', password: '', role: 'faculty' });
  };

  const handleSubjectSubmit = async (event) => {
    event.preventDefault();
    await createAdminData('subjects', { name: subjectName, departmentId: subjectDepartmentId });
    setSubjectName('');
    setSubjectDepartmentId('');
  };

  const filteredStudents = selectedBatch ? students.filter((student) => student.batchId === Number(selectedBatch)) : students;

  return (
    <div>
      <div className="card hero-card">
        <h2>Admin Dashboard</h2>
        <p>Manage departments, faculty, students, and labs with clear class-based oversight.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Create Department</h3>
          <form onSubmit={handleDepartmentSubmit}>
            <label>
              Department name
              <input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} required />
            </label>
            <button type="submit" className="primary">Add Department</button>
          </form>
        </div>

        <div className="card">
          <h3>Create Subject</h3>
          <form onSubmit={handleSubjectSubmit}>
            <label>
              Subject name
              <input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
            </label>
            <label>
              Department
              <select value={subjectDepartmentId} onChange={(e) => setSubjectDepartmentId(e.target.value)} required>
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="primary">Add Subject</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h3>Create User</h3>
        <form onSubmit={handleUserSubmit}> 
          <div className="grid-2">
            <label>
              Name
              <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
            </label>
            <label>
              Email
              <input value={user.email} type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
            </label>
          </div>
          <div className="grid-2">
            <label>
              Password
              <input value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
            </label>
            <label>
              Role
              <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          <button type="submit" className="primary">Create User</button>
        </form>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Faculty by Department</h3>
          <label>
            Department
            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">Choose a department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </label>
          {faculties.length > 0 ? (
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Subjects</th></tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty.id}>
                    <td>{faculty.name}</td>
                    <td>{faculty.email}</td>
                    <td>{faculty.Subjects.map((subject) => subject.name).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="small-text">Select a department to view faculty.</p>
          )}
        </div>

        <div className="card">
          <h3>Students by Class</h3>
          <label>
            Batch
            <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
              <option value="">All batches</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
          </label>
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Roll</th><th>Batch</th></tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.Batch?.name || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
