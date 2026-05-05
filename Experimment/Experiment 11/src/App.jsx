import { useState } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ name: '', roll: '', course: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddStudent = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.roll.trim() || !form.course.trim()) {
      alert('Please fill all fields before adding a student.')
      return
    }

    const newStudent = {
      id: Date.now(),
      name: form.name.trim(),
      roll: form.roll.trim(),
      course: form.course.trim(),
    }

    setStudents((prev) => [newStudent, ...prev])
    setForm({ name: '', roll: '', course: '' })
    alert(`Student ${newStudent.name} added successfully!`)
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="brand">Student Dashboard</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#add">Add Student</a>
          <a href="#list">Student List</a>
        </nav>
      </header>

      <main>
       

        <section id="add" className="panel">
          <h2>Add Student</h2>
          <form className="form-grid" onSubmit={handleAddStudent}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter student name"
              />
            </label>

            <label>
              Roll Number
              <input
                type="text"
                name="roll"
                value={form.roll}
                onChange={handleChange}
                placeholder="Enter roll number"
              />
            </label>

            <label>
              Course
              <input
                type="text"
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="Enter course name"
              />
            </label>

            <button type="submit" className="primary-button">
              Add Student
            </button>
          </form>
        </section>

        <section id="list" className="panel">
          <h2>Student List</h2>
          {students.length === 0 ? (
            <p className="empty-state">No students added yet. Add a student to display the list.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.roll}</td>
                    <td>{student.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
