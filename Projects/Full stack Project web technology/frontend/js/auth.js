// ======================== COMMON FUNCTIONS ========================

// Defensive fallback for unexpected legacy/global access to 'poos' variable
window.poos = window.poos || {};

const API_BASE = 'http://localhost:5000/api';

// Show Alert
function showAlert(message, type = 'info') {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.className = `alert show alert-${type}`;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 5000);
}

// Update time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleString();
  const timeElements = document.querySelectorAll('#currentTime');
  timeElements.forEach(el => el.textContent = timeString);
}

// Set interval for time update
setInterval(updateTime, 1000);
updateTime();

// ======================== LOGIN/SIGNUP TOGGLE ========================

document.getElementById('loginToggle')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('loginToggle').classList.add('active');
  document.getElementById('signupToggle').classList.remove('active');
  
  document.getElementById('loginRoleTabs').classList.remove('hidden');
  document.getElementById('signupRoleTabs').classList.add('hidden');
  
  document.querySelectorAll('.login-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('adminLoginForm').classList.remove('hidden');
});

document.getElementById('signupToggle')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('signupToggle').classList.add('active');
  document.getElementById('loginToggle').classList.remove('active');
  
  document.getElementById('loginRoleTabs').classList.add('hidden');
  document.getElementById('signupRoleTabs').classList.remove('hidden');
  
  document.querySelectorAll('.login-form').forEach(f => f.classList.add('hidden'));
  document.getElementById('teacherSignupForm').classList.remove('hidden');

  // reset signup tab
  document.querySelectorAll('#signupRoleTabs .role-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('#signupRoleTabs .role-tab[data-signup-role="teacher"]').classList.add('active');
});

// Signup role tab switching
document.querySelectorAll('#signupRoleTabs .role-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('#signupRoleTabs .role-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.getElementById('teacherSignupForm').classList.add('hidden');
    document.getElementById('studentSignupForm').classList.add('hidden');

    const role = tab.dataset.signupRole;
    if (role === 'teacher') {
      document.getElementById('teacherSignupForm').classList.remove('hidden');
    } else if (role === 'student') {
      document.getElementById('studentSignupForm').classList.remove('hidden');
    }
  });
});

// ======================== TEACHER SIGN UP ========================

document.getElementById('teacherSignupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  // Validation
  if (password.length < 6) {
    showAlert('Password must be at least 6 characters', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('Passwords do not match', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/teacher-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (data.success) {
      showAlert('✅ Teacher account created successfully! Please login now.', 'success');
      document.getElementById('teacherSignupForm').reset();
      
      // Switch to login tab
      setTimeout(() => {
        document.getElementById('loginToggle').click();
        document.querySelector('[data-role="teacher"]').click();
        document.getElementById('teacherEmail').value = email;
      }, 1500);
    } else {
      showAlert(data.message || 'Sign up failed', 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

// ======================== STUDENT SIGN UP ========================

document.getElementById('studentSignupForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const full_name = document.getElementById('studentSignupName').value.trim();
  const prn = document.getElementById('studentSignupPRN').value.trim();
  const branch = document.getElementById('studentSignupBranch').value.trim();
  const year = document.getElementById('studentSignupYear').value ? Number(document.getElementById('studentSignupYear').value) : null;
  const division = document.getElementById('studentSignupDivision').value.trim();
  const password = document.getElementById('studentSignupPassword').value;
  const confirmPassword = document.getElementById('studentSignupConfirmPassword').value;

  if (!full_name || !prn) {
    showAlert('Full name and PRN are required for sign up', 'error');
    return;
  }

  if (password.length < 4) {
    showAlert('Password must be at least 4 characters', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('Passwords do not match', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/student-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, prn, branch, year, division, password })
    });

    const data = await response.json();

    if (data.success) {
      showAlert('✅ Student account created successfully! Please login now.', 'success');
      document.getElementById('studentSignupForm').reset();

      setTimeout(() => {
        document.getElementById('loginToggle').click();
        document.querySelector('[data-role="student"]').click();
        document.getElementById('studentPRN').value = prn;
        document.getElementById('studentPassword').value = password;
      }, 1500);
    } else {
      showAlert(data.message || 'Sign up failed', 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

// ======================== AUTHENTICATION ========================

// Admin Login
document.getElementById('adminLoginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  try {
    const response = await fetch(`${API_BASE}/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('adminId', data.admin_id);
      window.location.href = 'admin-dashboard.html';
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

// Teacher Login
document.getElementById('teacherLoginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('teacherEmail').value;
  const password = document.getElementById('teacherPassword').value;

  try {
    const response = await fetch(`${API_BASE}/auth/teacher-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('userRole', 'teacher');
      localStorage.setItem('teacherId', data.teacher_id);
      localStorage.setItem('teacherName', data.name);
      window.location.href = 'teacher-dashboard.html';
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

// Student Login
document.getElementById('studentLoginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const prn = document.getElementById('studentPRN').value;
  const password = document.getElementById('studentPassword').value;

  try {
    const response = await fetch(`${API_BASE}/auth/student-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prn, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('studentId', data.student_id);
      localStorage.setItem('studentName', data.full_name);
      localStorage.setItem('studentPRN', data.prn);
      window.location.href = 'student-dashboard.html';
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    showAlert('Error: ' + error.message, 'error');
  }
});

// ======================== ROLE TAB SWITCHING ========================

// Login role switcher (Admin/Teacher/Student login)
document.querySelectorAll('#loginRoleTabs .role-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from login role tabs only
    document.querySelectorAll('#loginRoleTabs .role-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Hide all login forms (not signup forms)
    document.querySelectorAll('.login-form').forEach(form => form.classList.add('hidden'));

    // Show selected login form
    const role = tab.dataset.role;
    if (role) {
      const target = document.getElementById(`${role}LoginForm`);
      if (target) target.classList.remove('hidden');
    }
  });
});


// ======================== LOGOUT ========================

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.clear();
    window.location.href = 'login.html';
  }
}

// ======================== SESSION CHECK ========================

function checkSession() {
  const userRole = localStorage.getItem('userRole');
  const currentPage = window.location.pathname.split('/').pop();
  
  // If on login page and already logged in, redirect to dashboard
  if (currentPage === 'login.html' && userRole) {
    if (userRole === 'admin') window.location.href = 'admin-dashboard.html';
    if (userRole === 'teacher') window.location.href = 'teacher-dashboard.html';
    if (userRole === 'student') window.location.href = 'student-dashboard.html';
  }
  
  // If on dashboard and not logged in, redirect to login
  if ((currentPage === 'admin-dashboard.html' || currentPage === 'teacher-dashboard.html' || currentPage === 'student-dashboard.html') && !userRole) {
    window.location.href = 'login.html';
  }
}

checkSession();
