import { useEffect, useState } from 'react';
import { fetchResults } from '../services/api';

export default function ResultPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults().then(setResults).catch(console.error);
  }, []);

  return (
    <div>
      <div className="card hero-card">
        <h2>Your Results</h2>
        <p>Review all lab results with final marks out of 50 and per-practical details.</p>
      </div>

      {results.length === 0 ? (
        <div className="card">No results found yet.</div>
      ) : (
        results.map((labResult) => (
          <div className="card" key={labResult.labId}>
            <h3>{labResult.labName} <span className="subtext">({labResult.subjectName} / {labResult.batchName})</span></h3>
            <p><strong>Final Score:</strong> {labResult.finalScore.toFixed(2)} / 50</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Practical</th>
                  <th>Attendance</th>
                  <th>Journal</th>
                  <th>Performance</th>
                  <th>Viva 1</th>
                  <th>Viva 2</th>
                  <th>Viva 3</th>
                </tr>
              </thead>
              <tbody>
                {labResult.practicals.map((item) => (
                  <tr key={item.practicalId}>
                    <td>{item.title}</td>
                    <td>{item.attendance}</td>
                    <td>{item.journal}</td>
                    <td>{item.performance}</td>
                    <td>{item.viva1}</td>
                    <td>{item.viva2}</td>
                    <td>{item.viva3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
