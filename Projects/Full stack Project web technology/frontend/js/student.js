// ======================== STUDENT DASHBOARD ========================

const API_BASE = 'http://localhost:5000/api';
let currentLabStudentId = null;

// Check session
function checkStudentSession() {
  if (localStorage.getItem('userRole') !== 'student') {
    window.location.href = 'login.html';
  }
}

checkStudentSession();

// ======================== INITIALIZATION ========================

document.addEventListener('DOMContentLoaded', () => {
  const studentName = localStorage.getItem('studentName');
  const studentPRN = localStorage.getItem('studentPRN');
  
  document.getElementById('studentName').textContent = studentName;
  document.getElementById('studentInfo').textContent = `PRN: ${studentPRN}`;
  
  loadStudentLabs();
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
      
      if (section === 'summary') {
        loadSummary();
      }
    });
  });
}

// ======================== LABS MANAGEMENT ========================

async function loadStudentLabs() {
  const studentId = localStorage.getItem('studentId');
  
  try {
    const response = await fetch(`${API_BASE}/student/labs/${studentId}`);
    const data = await response.json();

    if (data.success) {
      const labsList = document.getElementById('labsList');
      labsList.innerHTML = '';

      if (data.data.length === 0) {
        labsList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No labs assigned yet.</div>';
      } else {
        data.data.forEach(lab => {
          const card = document.createElement('div');
          card.className = 'card';
          card.style.cursor = 'pointer';
          card.innerHTML = `
            <h4>🧪 ${lab.lab_name}</h4>
            <p style="margin: 10px 0; font-size: 14px; color: #666;">
              <strong>Class:</strong> ${lab.branch} - Year ${lab.year} - Division ${lab.division}<br>
              <strong>Practicals:</strong> ${lab.total_practicals}<br>
              <strong>Teacher:</strong> ${lab.teacher_id}
            </p>
            <button class="btn btn-primary btn-block" onclick="viewLabPracticals(${lab.lab_id}, '${lab.lab_name}')">📖 View Practicals</button>
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

// ======================== PRACTICALS VIEW ========================

async function viewLabPracticals(labId, labName) {
  const studentId = localStorage.getItem('studentId');
  currentLabStudentId = studentId;
  
  // Show practicals section
  document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
  document.getElementById('practicals-section').classList.remove('hidden');
  
  document.getElementById('labTitle').textContent = `📖 ${labName} - My Practicals`;
  
  try {
    const response = await fetch(`${API_BASE}/student/practicals/${studentId}/${labId}`);
    const data = await response.json();

    if (data.success) {
      renderStudentPracticals(data);
    } else {
      showAlert('Error loading practicals', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error: ' + error.message, 'error');
  }
}

function renderStudentPracticals(data) {
  const { student, practicals, summary } = data;
  
  // Update statistics
  document.getElementById('completedCount').textContent = summary.completed_practicals;
  document.getElementById('completedPercent').textContent = `${summary.completed_practicals} of ${summary.total_practicals} practicals`;
  document.getElementById('totalMarks').textContent = summary.total_marks;
  document.getElementById('attendanceCount').textContent = summary.total_attendance;
  document.getElementById('attendancePercent').textContent = `${summary.total_attendance} of ${summary.total_practicals} practicals`;
  
  // Render practicals table
  const tbody = document.getElementById('practicalsTableBody');
  tbody.innerHTML = '';
  
  const row = document.createElement('tr');
  let html = `
    <td style="position: sticky; left: 0; background: white; border-right: 3px solid var(--border-color);">
      <strong>${student.full_name}</strong><br>
      <small>${student.prn}</small>
    </td>
  `;
  
  practicals.forEach(practical => {
    const getStatusIcon = (value) => value ? '✓' : '✗';
    const getAttendanceText = (value) => value ? 'Present' : 'Absent';
    
    html += `
      <td class="practical-column">
        <div class="practical-cell">
          <span style="font-size: 12px; color: #666;"><strong>P${practical.practical_no}</strong></span>
          <div style="border: 1px solid #ddd; padding: 8px; border-radius: 3px; width: 100%;">
            <p style="margin: 4px 0; font-size: 12px;">
              ✓ <strong>${getStatusIcon(practical.completed)}</strong>
            </p>
            <p style="margin: 4px 0; font-size: 12px;">
              📝 <strong>${practical.marks}/10</strong>
            </p>
            <p style="margin: 4px 0; font-size: 12px;">
              👥 <strong>${getAttendanceText(practical.attendance)}</strong>
            </p>
          </div>
        </div>
      </td>
    `;
  });
  
  html += '</tr>';
  row.innerHTML = html;
  tbody.appendChild(row);
}

function goBackToLabs() {
  document.querySelectorAll('.section-content').forEach(s => s.classList.add('hidden'));
  document.getElementById('labs-section').classList.remove('hidden');
  document.querySelector('.nav-link[data-section="labs"]').classList.add('active');
  document.querySelector('.nav-link[data-section="summary"]').classList.remove('active');
}

// ======================== SUMMARY VIEW ========================

async function loadSummary() {
  const studentId = localStorage.getItem('studentId');
  
  try {
    const response = await fetch(`${API_BASE}/student/summary/${studentId}`);
    const data = await response.json();

    if (data.success) {
      renderSummary(data);
    } else {
      showAlert('Error loading summary', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error: ' + error.message, 'error');
  }
}

function renderSummary(data) {
  const { student, labs } = data;
  
  let html = `
    <div style="background: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
      <h4>👨‍🎓 Student Information</h4>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${student.full_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>PRN:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${student.prn}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Branch:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${student.branch}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Year:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Year ${student.year}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Division:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Division ${student.division}</td>
        </tr>
      </table>
    </div>
  `;
  
  if (labs.length === 0) {
    html += '<div style="text-align: center; padding: 40px; color: #999;">No labs assigned yet.</div>';
  } else {
    labs.forEach(lab => {
      const completionPercent = lab.total_practicals > 0 ? Math.round((lab.completed_practicals / lab.total_practicals) * 100) : 0;
      const marksPercent = lab.total_practicals > 0 ? Math.round((lab.total_marks / (lab.total_practicals * 10)) * 100) : 0;
      const attendancePercent = lab.total_practicals > 0 ? Math.round((lab.total_attendance / lab.total_practicals) * 100) : 0;
      
      html += `
        <div style="background: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid var(--primary-color);">
          <h4>🧪 ${lab.lab_name}</h4>
          <p style="color: #666; margin: 10px 0; font-size: 14px;"><strong>Teacher:</strong> ${lab.teacher_name}</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              <p style="color: #666; font-size: 12px; margin-bottom: 8px;">Completion Status</p>
              <div style="font-size: 24px; font-weight: bold; color: var(--primary-color);">${lab.completed_practicals}/${lab.total_practicals}</div>
              <div style="width: 100%; background: #ddd; height: 8px; border-radius: 4px; margin: 10px 0; overflow: hidden;">
                <div style="background: var(--primary-color); height: 100%; width: ${completionPercent}%;"></div>
              </div>
              <p style="font-size: 12px; color: #666;">${completionPercent}% Complete</p>
            </div>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              <p style="color: #666; font-size: 12px; margin-bottom: 8px;">Total Marks</p>
              <div style="font-size: 24px; font-weight: bold; color: var(--secondary-color);">${lab.total_marks}/${lab.total_practicals * 10}</div>
              <div style="width: 100%; background: #ddd; height: 8px; border-radius: 4px; margin: 10px 0; overflow: hidden;">
                <div style="background: var(--secondary-color); height: 100%; width: ${marksPercent}%;"></div>
              </div>
              <p style="font-size: 12px; color: #666;">${marksPercent}% Average</p>
            </div>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              <p style="color: #666; font-size: 12px; margin-bottom: 8px;">Attendance</p>
              <div style="font-size: 24px; font-weight: bold; color: var(--warning-color);">${lab.total_attendance}/${lab.total_practicals}</div>
              <div style="width: 100%; background: #ddd; height: 8px; border-radius: 4px; margin: 10px 0; overflow: hidden;">
                <div style="background: var(--warning-color); height: 100%; width: ${attendancePercent}%;"></div>
              </div>
              <p style="font-size: 12px; color: #666;">${attendancePercent}% Present</p>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  document.getElementById('summaryContent').innerHTML = html;
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
