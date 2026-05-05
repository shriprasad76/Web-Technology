const apiUrl = 'http://localhost:3000/students';

const form = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const marksInput = document.getElementById('student-marks');
const loadButton = document.getElementById('load-students');
const tableBody = document.getElementById('students-table-body');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const marks = marksInput.value.trim();

  if (!name || marks === '') {
    alert('Please enter both name and marks.');
    return;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, marks })
  });

  if (response.ok) {
    nameInput.value = '';
    marksInput.value = '';
    loadStudents();
  } else {
    const error = await response.json();
    alert(error.message || 'Failed to add student.');
  }
});

loadButton.addEventListener('click', loadStudents);

async function loadStudents() {
  const response = await fetch(apiUrl);
  const students = await response.json();
  renderStudents(students);
}

function renderStudents(students) {
  if (students.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No students available.</td></tr>';
    return;
  }

  tableBody.innerHTML = '';
  students.forEach((student) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.marks}</td>
      <td class="actions-cell">
        <button class="small-button" data-action="update" data-id="${student.id}">Update</button>
        <button class="small-button delete" data-action="delete" data-id="${student.id}">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Handle update and delete button clicks in the table
tableBody.addEventListener('click', async (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const studentId = button.dataset.id;

  if (action === 'update') {
    const newMarks = prompt('Enter new marks for this student:');
    if (newMarks === null) return;

    const response = await fetch(`${apiUrl}/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marks: newMarks })
    });

    if (response.ok) {
      loadStudents();
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to update student.');
    }
  }

  if (action === 'delete') {
    const confirmed = confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    const response = await fetch(`${apiUrl}/${studentId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadStudents();
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to delete student.');
    }
  }
});

loadStudents();
