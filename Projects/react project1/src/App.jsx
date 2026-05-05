import { NavLink, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import About from './About.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Portfolio Dashboard</div>
        <nav>
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/about">About Me</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
