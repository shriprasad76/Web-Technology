import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  return (
    <div>
      <div className="card">
        <h2>Student Dashboard</h2>
        <p>View your subject-wise evaluation results and final marks out of 50.</p>
        <Link to="/student/results" className="primary">View Results</Link>
      </div>
    </div>
  );
}
