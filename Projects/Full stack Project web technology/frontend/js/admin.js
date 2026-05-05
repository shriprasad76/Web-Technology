// ======================== ADMIN DASHBOARD ========================

const API_BASE = 'http://localhost:5000/api';
let currentDeleteId = null;
let currentDeleteType = null;

// Check session
function checkAdminSession() {
  if (localStorage.getItem('userRole') !== 'admin') {
    window.location.href = 'login.html';
  }
}

checkAdminSession();

// ======================== INITIALIZATION ========================

document.addEventListener('DOMContentLoaded', () => {
  loadStudents();
  loadTeachers();
  setupNavigation();
  updateTime();
});

// ======================== NAVIGATION ========================

function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      
      // Remove active class from all
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Hide all sections
      document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
      
      // Show selected section
      document.getElementById(`${section}-section`).classList.remove('hidden');
      
      if (section === 'overview') {
        loadOverview();
      }
    });
  });
}

// ======================== STUDENT MANAGEMENT ========================

async function loadStudents() {
  try {
    const response = await fetch(`${API_BASE}/admin/students`);
    const data = await response.json();

    if (data.success) {
      const tbody = document.getElementById('studentsList');
      tbody.innerHTML = '';

      data.data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.prn}</td>
          <td>${student.full_name}</td>
          <td>${student.branch}</td>
          <td>${student.year}</td>
          <td>${student.division}</td>
          <td>
            <div class="table-actions">
              <button class="btn btn-secondary btn-small" onclick="editStudent(${student.student_id}, '${student.prn}', '${student.full_name}', '${student.branch}', ${student.year}, '${student.division}')">✏️ Edit</button>
              <button class="btn btn-danger btn-small" onclick="deleteStudent(${student.student_id}, '${student.full_name}')">🗑️ Delete</button>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error loading students:', error);
  }
}

document.getElementById('addStudentForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    prn: document.getElementById('studentPRN').value,
    full_name: document.getElementById('studentName').value,
    branch: document.getElementById('studentBranch').value,
    year: parseInt(document.getElementById('studentYear').value),
    division: document.getElementById('studentDivision').value
  };

  try {
    const response = await fetch(`${API_BASE}/admin/students/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      showAlert('Student added successfully!', 'success');
      document.getElementById('addStudentForm').reset();
      loadStudents();
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

function editStudent(id, prn, name, branch, year, division) {
  document.getElementById('studentPRN').value = prn;
  document.getElementById('studentName').value = name;
  document.getElementById('studentBranch').value = branch;
  document.getElementById('studentYear').value = year;
  document.getElementById('studentDivision').value = division;
  
  // Scroll to form
  document.getElementById('addStudentForm').scrollIntoView({ behavior: 'smooth' });
  showAlert('Edit the form and submit to update', 'info');
}

function deleteStudent(id, name) {
  currentDeleteId = id;
  currentDeleteType = 'student';
  document.getElementById('confirmMessage').textContent = `Are you sure you want to delete student "${name}"?`;
  document.getElementById('confirmBtn').onclick = () => confirmDeleteStudent();
  openModal('confirmModal');
}

async function confirmDeleteStudent() {
  try {
    const response = await fetch(`${API_BASE}/admin/students/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: currentDeleteId })
    });

    const data = await response.json();

    if (data.success) {
      showAlert('Student deleted successfully!', 'success');
      closeModal('confirmModal');
      loadStudents();
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
}

// ======================== TEACHER MANAGEMENT ========================

async function loadTeachers() {
  try {
    const response = await fetch(`${API_BASE}/admin/teachers`);
    const data = await response.json();

    if (data.success) {
      const tbody = document.getElementById('teachersList');
      tbody.innerHTML = '';

      data.data.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${teacher.name}</td>
          <td>${teacher.email}</td>
          <td>
            <div class="table-actions">
              <button class="btn btn-secondary btn-small" onclick="editTeacher(${teacher.teacher_id}, '${teacher.name}', '${teacher.email}')">✏️ Edit</button>
              <button class="btn btn-danger btn-small" onclick="deleteTeacher(${teacher.teacher_id}, '${teacher.name}')">🗑️ Delete</button>
            </div>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error loading teachers:', error);
  }
}

document.getElementById('addTeacherForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('teacherName').value,
    email: document.getElementById('teacherEmail').value,
    password: document.getElementById('teacherPassword').value
  };

  try {
    const response = await fetch(`${API_BASE}/admin/teachers/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      showAlert('Teacher added successfully!', 'success');
      document.getElementById('addTeacherForm').reset();
      loadTeachers();
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

function editTeacher(id, name, email) {
  document.getElementById('teacherName').value = name;
  document.getElementById('teacherEmail').value = email;
  document.getElementById('teacherPassword').value = '';
  
  // Scroll to form
  document.getElementById('addTeacherForm').scrollIntoView({ behavior: 'smooth' });
  showAlert('Edit the form and submit to update', 'info');
}

function deleteTeacher(id, name) {
  currentDeleteId = id;
  currentDeleteType = 'teacher';
  document.getElementById('confirmMessage').textContent = `Are you sure you want to delete teacher "${name}"?`;
  document.getElementById('confirmBtn').onclick = () => confirmDeleteTeacher();
  openModal('confirmModal');
}

async function confirmDeleteTeacher() {
  try {
    const response = await fetch(`${API_BASE}/admin/teachers/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacher_id: currentDeleteId })
    });

    const data = await response.json();

    if (data.success) {
      showAlert('Teacher deleted successfully!', 'success');
      closeModal('confirmModal');
      loadTeachers();
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
}

// ======================== OVERVIEW ========================

async function loadOverview() {
  try {
    const [studentsRes, teachersRes] = await Promise.all([
      fetch(`${API_BASE}/admin/students`),
      fetch(`${API_BASE}/admin/teachers`)
    ]);

    const studentsData = await studentsRes.json();
    const teachersData = await teachersRes.json();

    document.getElementById('totalStudents').textContent = studentsData.data ? studentsData.data.length : 0;
    document.getElementById('totalTeachers').textContent = teachersData.data ? teachersData.data.length : 0;
    // Active labs will be updated when teacher creation is done
    document.getElementById('activeLabs').textContent = 0;
  } catch (error) {
    console.error('Error loading overview:', error);
  }
}

// ======================== MODAL FUNCTIONS ========================

function openModal(modalId) {
  document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}

// Close modal on background click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
  }
});

// ======================== COMMON FUNCTIONS ========================

function showAlert(message, type = 'info') {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.className = `alert show alert-${type}`;
  
  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 5000);
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear();
    window.location.href = 'login.html';
  }
}

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleString();
  const timeElement = document.getElementById('currentTime');
  if (timeElement) timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
