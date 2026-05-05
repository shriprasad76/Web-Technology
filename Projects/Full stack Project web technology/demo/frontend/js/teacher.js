// ======================== TEACHER DASHBOARD ========================

const API_BASE = 'http://localhost:5000/api';
let currentLabId = null;
let changedPracticals = new Map(); // Track which practicals have been modified

// Check session
function checkTeacherSession() {
  if (localStorage.getItem('userRole') !== 'teacher') {
    window.location.href = 'login.html';
  }
}

checkTeacherSession();

// ======================== INITIALIZATION ========================

document.addEventListener('DOMContentLoaded', () => {
  const teacherName = localStorage.getItem('teacherName');
  document.getElementById('teacherName').textContent = teacherName;
  
  loadLabs();
  setupNavigation();
  updateTime();
});

// ======================== NAVIGATION ========================

function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
      document.getElementById(`${section}-section`).classList.remove('hidden');
    });
  });
}

// ======================== LAB MANAGEMENT ========================

async function loadLabs() {
  const teacherId = localStorage.getItem('teacherId');
  
  try {
    const response = await fetch(`${API_BASE}/teacher/labs/${teacherId}`);
    const data = await response.json();

    if (data.success) {
      const labsList = document.getElementById('labsList');
      labsList.innerHTML = '';

      if (data.data.length === 0) {
        labsList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No labs created yet. Create a new lab to get started!</div>';
      } else {
        data.data.forEach(lab => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <h4>${lab.lab_name}</h4>
            <p style="margin: 10px 0; font-size: 14px; color: #666;">
              <strong>Class:</strong> ${lab.branch} - Year ${lab.year} - Division ${lab.division}<br>
              <strong>Practicals:</strong> ${lab.total_practicals}<br>
              <strong>Created:</strong> ${new Date(lab.created_at).toLocaleDateString()}
            </p>
            <button class="btn btn-primary btn-block" style="margin-bottom: 10px;" onclick="viewLabEvaluation(${lab.lab_id}, '${lab.lab_name}')">📊 View Evaluation</button>
          `;
          labsList.appendChild(card);
        });
      }
    }
  } catch (error) {
    console.error('Error loading labs:', error);
    showAlert('Error loading labs', 'error');
  }
}

// Create Lab
document.getElementById('createLabForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const teacherId = localStorage.getItem('teacherId');
  const formData = {
    teacher_id: parseInt(teacherId),
    lab_name: document.getElementById('labName').value,
    branch: document.getElementById('labBranch').value,
    year: parseInt(document.getElementById('labYear').value),
    division: document.getElementById('labDivision').value
  };

  try {
    const response = await fetch(`${API_BASE}/teacher/labs/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      showAlert(`Lab created successfully! ${data.students_assigned} students assigned.`, 'success');
      document.getElementById('createLabForm').reset();
      loadLabs();
      
      // Switch back to labs view
      document.querySelector('[data-section="labs"]').click();
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

// ======================== LAB EVALUATION ========================

async function viewLabEvaluation(labId, labName) {
  currentLabId = labId;
  changedPracticals.clear();
  
  // Show evaluation section
  document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
  document.getElementById('evaluation-section').classList.remove('hidden');
  
  document.getElementById('labTitle').textContent = `📊 Lab: ${labName}`;
  
  try {
    const response = await fetch(`${API_BASE}/teacher/labs/students/${labId}`);
    const data = await response.json();

    if (data.success) {
      renderEvaluationTable(data.data);
    } else {
      showAlert('Error loading lab students', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error: ' + error.message, 'error');
  }
}

function renderEvaluationTable(students) {
  const content = document.getElementById('evaluationContent');
  
  // Create horizontal scrolling table
  let html = `
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 250px; position: sticky; left: 0; background: var(--primary-color);">Student Details</th>
            <th colspan="12" style="text-align: center;">Practicals (1-12)</th>
          </tr>
          <tr>
            <th style="width: 250px; position: sticky; left: 0; background: var(--primary-color);">Name / PRN</th>
  `;
  
  for (let i = 1; i <= 12; i++) {
    html += `<th class="practical-header" style="width: 120px;">P${i}</th>`;
  }
  
  html += `</tr></thead><tbody>`;
  
  students.forEach(student => {
    html += `
      <tr>
        <td style="position: sticky; left: 0; background: white; border-right: 3px solid var(--border-color);">
          <strong>${student.full_name}</strong><br>
          <small>${student.prn}</small>
        </td>
    `;
    
    student.practicals.forEach(practical => {
      const statusId = practical.status_id;
      html += `
        <td style="min-width: 120px; padding: 8px;">
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 11px; color: #666;">
              <input type="checkbox" class="practical-checkbox" data-status-id="${statusId}" 
                ${practical.completed ? 'checked' : ''} onchange="trackChange(${statusId})">
              ✓ Done
            </label>
            <input type="number" class="marks-input" data-status-id="${statusId}" 
              min="0" max="10" value="${practical.marks}" placeholder="Marks" 
              onchange="trackChange(${statusId})" style="width: 100%;">
            <label style="font-size: 11px; color: #666;">
              <input type="checkbox" class="practical-attendance" data-status-id="${statusId}" 
                ${practical.attendance ? 'checked' : ''} onchange="trackChange(${statusId})">
              👥 Present
            </label>
            <button class="btn btn-success btn-small" style="margin-top: 4px;" onclick="saveSinglePractical(${statusId})">💾 Save</button>
          </div>
        </td>
      `;
    });
    
    html += `</tr>`;
  });
  
  html += `</tbody></table></div>`;
  
  content.innerHTML = html;
  
  // Attach event listener to save button
  document.getElementById('savePracticalBtn').onclick = () => savePracticalChanges();
}

function trackChange(statusId) {
  changedPracticals.set(statusId, true);
  document.getElementById('savePracticalBtn').style.background = '#ff9800'; // Highlight save button
}

async function saveSinglePractical(statusId) {
  const completed = document.querySelector(`.practical-checkbox[data-status-id="${statusId}"]`).checked;
  const marks = parseInt(document.querySelector(`.marks-input[data-status-id="${statusId}"]`).value) || 0;
  const attendance = document.querySelector(`.practical-attendance[data-status-id="${statusId}"]`).checked;

  try {
    const response = await fetch(`${API_BASE}/teacher/practicals/update-status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status_id: statusId, completed, marks, attendance })
    });

    const result = await response.json();

    if (result.success) {
      showAlert(`Saved practical #${statusId} ✔`, 'success');
      changedPracticals.delete(statusId);
      if (changedPracticals.size === 0) {
        document.getElementById('savePracticalBtn').style.background = 'var(--primary-color)';
      }
    } else {
      showAlert(result.message || 'Update failed', 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
}

async function savePracticalChanges() {
  if (changedPracticals.size === 0) {
    showAlert('No changes to save', 'info');
    return;
  }

  const updates = [];
  
  changedPracticals.forEach((_, statusId) => {
    const completed = document.querySelector(`.practical-checkbox[data-status-id="${statusId}"]`).checked;
    const marks = parseInt(document.querySelector(`.marks-input[data-status-id="${statusId}"]`).value) || 0;
    const attendance = document.querySelector(`.practical-attendance[data-status-id="${statusId}"]`).checked;
    
    updates.push({
      status_id: statusId,
      completed: completed,
      marks: marks,
      attendance: attendance
    });
  });

  try {
    const response = await fetch(`${API_BASE}/teacher/practicals/update-status-batch`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates })
    });

    const result = await response.json();

    if (result.success) {
      showAlert(`✅ ${updates.length} practical(s) saved successfully!`, 'success');
      changedPracticals.clear();
      document.getElementById('savePracticalBtn').style.background = 'var(--primary-color)';
    } else {
      showAlert(result.message || 'Some updates failed', 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
}

function goBackToLabs() {
  document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
  document.getElementById('labs-section').classList.remove('hidden');
  document.querySelector('[data-section="labs"]').classList.add('active');
}

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
