import { useContext, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EvaluationForm from './pages/EvaluationForm';
import ResultPage from './pages/ResultPage';
import ProtectedRoute from './routes/ProtectedRoute';

function AppContent() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.user.role === 'admin') navigate('/admin');
    if (user.user.role === 'faculty') navigate('/faculty');
    if (user.user.role === 'student') navigate('/student');
  }, [user, navigate]);

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>College Lab Evaluation System</h1>
          <p>Role-based evaluation workflow for Admin, Faculty, and Student.</p>
        </div>
        <div className="navbar">
          {user ? (
            <>
              <span>Welcome, {user.user.name}</span>
              <button className="link-button" onClick={() => { logout(); navigate('/login'); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/faculty" element={<ProtectedRoute role="faculty"><FacultyDashboard /></ProtectedRoute>} />
        <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/faculty/evaluate" element={<ProtectedRoute role="faculty"><EvaluationForm /></ProtectedRoute>} />
        <Route path="/student/results" element={<ProtectedRoute role="student"><ResultPage /></ProtectedRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
