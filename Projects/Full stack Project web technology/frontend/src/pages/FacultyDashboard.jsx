import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createLab, fetchBatches, fetchLabs, fetchSubjects } from '../services/api';

export default function FacultyDashboard() {
  const [labs, setLabs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [form, setForm] = useState({ name: '', subjectId: '', batchId: '', totalPracticals: 1 });

  useEffect(() => {
    fetchLabs().then(setLabs).catch(console.error);
    fetchSubjects().then(setSubjects).catch(console.error);
    fetchBatches().then(setBatches).catch(console.error);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createLab({ ...form, subjectId: Number(form.subjectId), batchId: Number(form.batchId), totalPracticals: Number(form.totalPracticals) });
    setForm({ name: '', subjectId: '', batchId: '', totalPracticals: 1 });
    setLabs(await fetchLabs());
  };

  return (
    <div>
      <div className="card hero-card">
        <h2>Faculty Dashboard</h2>
        <p>Manage lab classes, create labs, and navigate to evaluation workflows.</p>
      </div>

      <div className="card">
        <h3>Create Lab for a Class</h3>
        <form onSubmit={handleSubmit} className="grid-2">
          <label>
            Lab name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            Subject
            <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} required>
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </label>
          <label>
            Class / Batch
            <select value={form.batchId} onChange={(e) => setForm({ ...form, batchId: e.target.value })} required>
              <option value="">Select batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
          </label>
          <label>
            Total Practicals
            <input type="number" min="1" value={form.totalPracticals} onChange={(e) => setForm({ ...form, totalPracticals: Number(e.target.value) })} required />
          </label>
          <button type="submit" className="primary">Create Lab</button>
        </form>
      </div>

      <div className="card">
        <h3>Existing Labs</h3>
        {labs.length === 0 ? (
          <p>No labs created yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Batch</th>
                <th>Total Practicals</th>
                <th>Student Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab) => (
                <tr key={lab.id}>
                  <td>{lab.name}</td>
                  <td>{lab.Subject?.name || lab.subjectId}</td>
                  <td>{lab.Batch?.name || lab.batchId}</td>
                  <td>{lab.totalPracticals}</td>
                  <td>{lab.studentCount ?? '-'}</td>
                  <td>
                    <Link to="/faculty/evaluate" className="secondary">Evaluate</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
