import { useEffect, useState } from 'react';
import { createPractical, fetchLabStudents, fetchLabResults, fetchLabs, submitEvaluation } from '../services/api';

export default function EvaluationForm() {
  const [labs, setLabs] = useState([]);
  const [selectedLab, setSelectedLab] = useState('');
  const [students, setStudents] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [practicalData, setPracticalData] = useState({ subjectId: '', title: '', practicalNumber: 1 });
  const [evaluationData, setEvaluationData] = useState({ studentId: '', subjectId: '', practicalId: '', attendance: 0, journal: 0, performance: 0, viva1: 0, viva2: 0, viva3: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLabs().then(setLabs).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedLab) {
      setStudents([]);
      setLabResults([]);
      return;
    }

    fetchLabStudents(selectedLab)
      .then((data) => setStudents(data.students || []))
      .catch(console.error);

    fetchLabResults(selectedLab)
      .then((data) => setLabResults(data.labResults || []))
      .catch(console.error);
  }, [selectedLab]);

  const handlePracticalSubmit = async (event) => {
    event.preventDefault();
    await createPractical(practicalData);
    setMessage('Practical created successfully.');
    setPracticalData({ subjectId: '', title: '', practicalNumber: 1 });
  };

  const handleEvaluationSubmit = async (event) => {
    event.preventDefault();
    if (!selectedLab) {
      setMessage('Please select a lab before saving marks.');
      return;
    }

    const selectedLabObject = labs.find((lab) => lab.id === Number(selectedLab));
    const payload = {
      ...evaluationData,
      studentId: Number(evaluationData.studentId),
      practicalId: Number(evaluationData.practicalId),
      subjectId: selectedLabObject?.subjectId || selectedLabObject?.Subject?.id,
    };

    const result = await submitEvaluation(payload);
    setMessage(`Marks saved. Final score: ${result.finalScore || 'saved'}`);
    setEvaluationData({ studentId: '', practicalId: '', attendance: 0, journal: 0, performance: 0, viva1: 0, viva2: 0, viva3: 0 });

    fetchLabResults(selectedLab)
      .then((data) => setLabResults(data.labResults || []))
      .catch(console.error);
  };

  return (
    <div>
      <div className="card hero-card">
        <h2>Evaluation Center</h2>
        <p>Pick a lab, create practicals, and assign marks to each student in the selected class.</p>
      </div>

      <div className="card">
        <label>
          Select Lab
          <select value={selectedLab} onChange={(e) => setSelectedLab(e.target.value)}>
            <option value="">Choose a lab</option>
            {labs.map((lab) => (
              <option key={lab.id} value={lab.id}>{lab.name} - {lab.Subject?.name || 'Subject'} / {lab.Batch?.name || 'Batch'}</option>
            ))}
          </select>
        </label>

        {students.length > 0 && (
          <div>
            <h4>Students in This Lab</h4>
            <table className="table">
              <thead>
                <tr><th>Name</th><th>Roll No</th><th>Select</th></tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>
                      <button type="button" className="link-button" onClick={() => setEvaluationData({ ...evaluationData, studentId: student.id })}>
                        Choose
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Create Practical</h3>
          <form onSubmit={handlePracticalSubmit}>
            <label>
              Subject ID
              <input
                value={practicalData.subjectId}
                onChange={(e) => setPracticalData({ ...practicalData, subjectId: e.target.value })}
                required
              />
            </label>
            <label>
              Title
              <input
                value={practicalData.title}
                onChange={(e) => setPracticalData({ ...practicalData, title: e.target.value })}
                required
              />
            </label>
            <label>
              Practical Number
              <input
                type="number"
                value={practicalData.practicalNumber}
                min="1"
                onChange={(e) => setPracticalData({ ...practicalData, practicalNumber: Number(e.target.value) })}
                required
              />
            </label>
            <button type="submit" className="primary">Create Practical</button>
          </form>
        </div>

        <div className="card">
          <h3>Enter Marks</h3>
          <form onSubmit={handleEvaluationSubmit}>
            <label>
              Student ID
              <input
                value={evaluationData.studentId}
                onChange={(e) => setEvaluationData({ ...evaluationData, studentId: e.target.value })}
                required
              />
            </label>
            <label>
              Practical ID
              <input
                value={evaluationData.practicalId}
                onChange={(e) => setEvaluationData({ ...evaluationData, practicalId: e.target.value })}
                required
              />
            </label>
            <label>
              Attendance (0-5)
              <input type="number" min="0" max="5" value={evaluationData.attendance} onChange={(e) => setEvaluationData({ ...evaluationData, attendance: Number(e.target.value) })} required />
            </label>
            <label>
              Journal (0-5)
              <input type="number" min="0" max="5" value={evaluationData.journal} onChange={(e) => setEvaluationData({ ...evaluationData, journal: Number(e.target.value) })} required />
            </label>
            <label>
              Performance (0-5)
              <input type="number" min="0" max="5" value={evaluationData.performance} onChange={(e) => setEvaluationData({ ...evaluationData, performance: Number(e.target.value) })} required />
            </label>
            <label>
              Viva 1 (0-15)
              <input type="number" min="0" max="15" value={evaluationData.viva1} onChange={(e) => setEvaluationData({ ...evaluationData, viva1: Number(e.target.value) })} required />
            </label>
            <label>
              Viva 2 (0-15)
              <input type="number" min="0" max="15" value={evaluationData.viva2} onChange={(e) => setEvaluationData({ ...evaluationData, viva2: Number(e.target.value) })} required />
            </label>
            <label>
              Viva 3 (0-20)
              <input type="number" min="0" max="20" value={evaluationData.viva3} onChange={(e) => setEvaluationData({ ...evaluationData, viva3: Number(e.target.value) })} required />
            </label>
            <button type="submit" className="primary">Save Marks</button>
          </form>
        </div>
      </div>

      {labResults.length > 0 && (
        <div className="card">
          <h3>Lab Results</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Total Practice</th>
                <th>Viva 1</th>
                <th>Viva 2</th>
                <th>Viva 3</th>
                <th>Final Score</th>
              </tr>
            </thead>
            <tbody>
              {labResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.name}</td>
                  <td>{result.rollNumber}</td>
                  <td>{result.totalPractice}</td>
                  <td>{result.viva1}</td>
                  <td>{result.viva2}</td>
                  <td>{result.viva3}</td>
                  <td>{result.finalScore?.toFixed(2) || '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {message && <div className="alert">{message}</div>}
    </div>
  );
}
